import React, { useRef, useState, useEffect, useCallback } from 'react';
import { NetworkDevice, NetworkConnection, PacketInfo, DeviceType } from '@/types/networkSimulator';
import { NetworkDeviceIcon } from './NetworkDeviceIcon';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface NetworkCanvasProps {
  devices: NetworkDevice[];
  connections: NetworkConnection[];
  packets: PacketInfo[];
  selectedDevice: string | null;
  connectingFrom: string | null;
  onDeviceClick: (deviceId: string) => void;
  onDeviceDoubleClick: (deviceId: string) => void;
  onDeviceDrop: (type: DeviceType, x: number, y: number) => void;
  onDeviceMove: (deviceId: string, x: number, y: number) => void;
  onConnectionClick?: (connectionId: string) => void;
}

export const NetworkCanvas: React.FC<NetworkCanvasProps> = ({
  devices,
  connections,
  packets,
  selectedDevice,
  connectingFrom,
  onDeviceClick,
  onDeviceDoubleClick,
  onDeviceDrop,
  onDeviceMove,
  onConnectionClick
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggingDevice, setDraggingDevice] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const deviceType = e.dataTransfer.getData('deviceType') as DeviceType;
    if (!deviceType || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 35; // Center the device
    const y = e.clientY - rect.top - 35;
    onDeviceDrop(deviceType, Math.max(0, x), Math.max(0, y));
  };

  const handleDeviceMouseDown = (e: React.MouseEvent, deviceId: string) => {
    if (e.button !== 0) return; // Only left click
    const device = devices.find(d => d.id === deviceId);
    if (!device || !canvasRef.current) return;

    // Calculate offset from device position to mouse position within the canvas
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    setDraggingDevice(deviceId);
    setDragOffset({
      x: mouseX - device.x,
      y: mouseY - device.y
    });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!draggingDevice || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    // Calculate new position based on mouse position minus the initial offset
    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;
    
    // Clamp to canvas bounds (device is 70x70)
    const x = Math.max(0, Math.min(rect.width - 70, newX));
    const y = Math.max(0, Math.min(rect.height - 70, newY));
    onDeviceMove(draggingDevice, x, y);
  }, [draggingDevice, dragOffset, onDeviceMove]);

  const handleMouseUp = useCallback(() => {
    setDraggingDevice(null);
  }, []);

  useEffect(() => {
    if (draggingDevice) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggingDevice, handleMouseMove, handleMouseUp]);

  const getDeviceCenter = (device: NetworkDevice) => ({
    x: device.x + 35,
    y: device.y + 35
  });

  const getPacketPosition = (packet: PacketInfo): { x: number; y: number } | null => {
    if (packet.currentPath.length < 2) return null;
    
    const sourceDevice = devices.find(d => d.id === packet.sourceId);
    const targetDevice = devices.find(d => d.id === packet.targetId);
    if (!sourceDevice || !targetDevice) return null;

    // Animate along the path
    return getDeviceCenter(targetDevice);
  };

  return (
    <div
      ref={canvasRef}
      className={cn(
        "relative w-full h-[500px] bg-gradient-to-br from-background to-muted/30 rounded-lg border-2 border-dashed border-border/50 overflow-hidden",
        connectingFrom && "cursor-crosshair"
      )}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle, hsl(var(--muted-foreground)) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />

      {/* Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {connections.map(conn => {
          const source = devices.find(d => d.id === conn.sourceId);
          const target = devices.find(d => d.id === conn.targetId);
          if (!source || !target) return null;

          const sourceCenter = getDeviceCenter(source);
          const targetCenter = getDeviceCenter(target);

          return (
            <g key={conn.id}>
              <line
                x1={sourceCenter.x}
                y1={sourceCenter.y}
                x2={targetCenter.x}
                y2={targetCenter.y}
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                strokeLinecap="round"
                className="cursor-pointer hover:stroke-[4px] transition-all"
                style={{ pointerEvents: 'stroke' }}
                onClick={(e) => {
                  e.stopPropagation();
                  onConnectionClick?.(conn.id);
                }}
              />
              <line
                x1={sourceCenter.x}
                y1={sourceCenter.y}
                x2={targetCenter.x}
                y2={targetCenter.y}
                stroke="hsl(var(--primary) / 0.3)"
                strokeWidth={8}
                strokeLinecap="round"
                className="animate-pulse"
              />
            </g>
          );
        })}

        {/* Connection preview line */}
        {connectingFrom && (
          <line
            x1={getDeviceCenter(devices.find(d => d.id === connectingFrom)!).x}
            y1={getDeviceCenter(devices.find(d => d.id === connectingFrom)!).y}
            x2="50%"
            y2="50%"
            stroke="hsl(var(--accent))"
            strokeWidth={2}
            strokeDasharray="5,5"
            className="pointer-events-none"
          />
        )}
      </svg>

      {/* Animated Packets - Hop by Hop */}
      <AnimatePresence>
        {packets.filter(p => p.status === 'traveling' && p.currentHop).map(packet => {
          const fromDevice = devices.find(d => d.id === packet.currentHop?.from);
          const toDevice = devices.find(d => d.id === packet.currentHop?.to);
          if (!fromDevice || !toDevice) return null;

          const from = getDeviceCenter(fromDevice);
          const to = getDeviceCenter(toDevice);

          return (
            <motion.div
              key={`${packet.id}-${packet.currentHop?.from}-${packet.currentHop?.to}`}
              initial={{ x: from.x - 8, y: from.y - 8, scale: 0.5 }}
              animate={{ x: to.x - 8, y: to.y - 8, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute w-4 h-4 bg-accent rounded-full shadow-lg z-20"
              style={{ boxShadow: '0 0 12px 3px hsl(var(--accent) / 0.7)' }}
            />
          );
        })}
      </AnimatePresence>

      {/* Devices */}
      {devices.map(device => (
        <div
          key={device.id}
          className={cn(
            "absolute transition-transform duration-75",
            draggingDevice === device.id && "z-10"
          )}
          style={{ left: device.x, top: device.y }}
          onMouseDown={(e) => handleDeviceMouseDown(e, device.id)}
        >
          <NetworkDeviceIcon
            type={device.type}
            name={device.name}
            config={device.config}
            selected={selectedDevice === device.id || connectingFrom === device.id}
            onClick={() => onDeviceClick(device.id)}
            onDoubleClick={() => onDeviceDoubleClick(device.id)}
          />
        </div>
      ))}

      {/* Empty state */}
      {devices.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <p className="text-lg font-medium">Ziehe Geräte hierher</p>
            <p className="text-sm">oder wähle ein Szenario zum Starten</p>
          </div>
        </div>
      )}
    </div>
  );
};
