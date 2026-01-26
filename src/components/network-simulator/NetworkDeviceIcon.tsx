import React from 'react';
import { DeviceType, NetworkDevice } from '@/types/networkSimulator';
import { cn } from '@/lib/utils';
import { Router, MonitorSmartphone, Server, Network } from 'lucide-react';

interface NetworkDeviceIconProps {
  type: DeviceType;
  name: string;
  selected?: boolean;
  config?: NetworkDevice['config'];
  onClick?: () => void;
  onDoubleClick?: () => void;
  className?: string;
}

const deviceColors: Record<DeviceType, string> = {
  router: 'from-blue-500 to-blue-600',
  switch: 'from-green-500 to-green-600',
  pc: 'from-purple-500 to-purple-600',
  server: 'from-orange-500 to-orange-600'
};

const DeviceIcon: Record<DeviceType, React.ElementType> = {
  router: Router,
  switch: Network,
  pc: MonitorSmartphone,
  server: Server
};

export const NetworkDeviceIcon: React.FC<NetworkDeviceIconProps> = ({
  type,
  name,
  selected,
  config,
  onClick,
  onDoubleClick,
  className
}) => {
  const Icon = DeviceIcon[type];

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1 cursor-pointer transition-all duration-200 select-none",
        selected && "scale-110",
        className
      )}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <div
        className={cn(
          "w-14 h-14 rounded-lg bg-gradient-to-br flex items-center justify-center shadow-lg transition-all duration-200",
          deviceColors[type],
          selected && "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-xl"
        )}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>
      <span className="text-xs font-medium text-foreground max-w-16 truncate">
        {name}
      </span>
      {config?.ipAddress && (
        <span className="text-[10px] text-muted-foreground">
          {config.ipAddress}
        </span>
      )}
    </div>
  );
};

interface DraggableDevicePaletteProps {
  onDragStart: (type: DeviceType) => void;
}

export const DraggableDevicePalette: React.FC<DraggableDevicePaletteProps> = ({ onDragStart }) => {
  const devices: { type: DeviceType; label: string }[] = [
    { type: 'router', label: 'Router' },
    { type: 'switch', label: 'Switch' },
    { type: 'pc', label: 'PC' },
    { type: 'server', label: 'Server' }
  ];

  return (
    <div className="flex gap-3 p-3 bg-card/80 backdrop-blur-sm rounded-lg border border-border/50 shadow-md">
      {devices.map(({ type, label }) => {
        const Icon = DeviceIcon[type];
        return (
          <div
            key={type}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('deviceType', type);
              onDragStart(type);
            }}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-lg cursor-grab active:cursor-grabbing transition-all duration-200 hover:bg-accent/20",
              "border border-transparent hover:border-border/50"
            )}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center shadow-md",
                deviceColors[type]
              )}
            >
              <Icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium">{label}</span>
          </div>
        );
      })}
    </div>
  );
};
