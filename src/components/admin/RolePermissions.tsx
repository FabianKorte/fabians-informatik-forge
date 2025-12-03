import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Crown, ShieldCheck, User, Check, X, Eye, Edit, Trash2, Plus, Settings } from 'lucide-react';
import { AppRole } from '@/hooks/useRoles';

interface Permission {
  name: string;
  description: string;
  icon: React.ElementType;
}

interface RolePermission {
  permission: Permission;
  allowed: boolean;
}

const PERMISSIONS: Permission[] = [
  { name: 'Lerninhalte anzeigen', description: 'Kann alle Lerninhalte sehen', icon: Eye },
  { name: 'Lerninhalte erstellen', description: 'Kann neue Lerninhalte hinzufügen', icon: Plus },
  { name: 'Lerninhalte bearbeiten', description: 'Kann Lerninhalte ändern', icon: Edit },
  { name: 'Lerninhalte löschen', description: 'Kann Lerninhalte entfernen', icon: Trash2 },
  { name: 'Benutzer anzeigen', description: 'Kann Benutzerliste sehen', icon: Eye },
  { name: 'Benutzer verwalten', description: 'Kann Benutzer bearbeiten/löschen', icon: Settings },
  { name: 'Rollen vergeben', description: 'Kann Benutzerrollen zuweisen', icon: Shield },
  { name: 'Audit-Logs einsehen', description: 'Kann Protokolle lesen', icon: Eye },
  { name: 'Ankündigungen verwalten', description: 'Kann Systemankündigungen erstellen', icon: Edit },
  { name: 'Kategorien verwalten', description: 'Kann Lernkategorien bearbeiten', icon: Settings },
  { name: 'Systemeinstellungen', description: 'Kann Systemkonfiguration ändern', icon: Settings },
];

const ROLE_PERMISSIONS: Record<AppRole, boolean[]> = {
  owner: [true, true, true, true, true, true, true, true, true, true, true],
  admin: [true, true, true, true, true, true, true, true, true, true, false],
  moderator: [true, true, true, false, true, false, false, true, false, false, false],
  user: [true, false, false, false, false, false, false, false, false, false, false],
};

const ROLE_INFO = {
  owner: {
    icon: Crown,
    label: 'Owner',
    description: 'Vollständige Kontrolle über die gesamte Plattform. Kann alle Einstellungen ändern und hat uneingeschränkten Zugriff.',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  admin: {
    icon: Shield,
    label: 'Administrator',
    description: 'Verwaltung von Inhalten, Benutzern und Rollen. Kann fast alle administrativen Aufgaben durchführen.',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
  moderator: {
    icon: ShieldCheck,
    label: 'Moderator',
    description: 'Moderation von Inhalten und Community. Kann Lerninhalte erstellen und bearbeiten, aber nicht löschen.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  user: {
    icon: User,
    label: 'Benutzer',
    description: 'Standard-Benutzer mit Zugriff auf Lerninhalte. Keine administrativen Rechte.',
    color: 'text-gray-500',
    bgColor: 'bg-gray-500/10',
  },
};

const PermissionRow = ({ permission, allowed }: { permission: Permission; allowed: boolean }) => {
  const Icon = permission.icon;
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${allowed ? 'bg-green-500/10' : 'bg-muted'}`}>
          <Icon className={`w-4 h-4 ${allowed ? 'text-green-500' : 'text-muted-foreground'}`} />
        </div>
        <div>
          <p className="font-medium text-sm">{permission.name}</p>
          <p className="text-xs text-muted-foreground">{permission.description}</p>
        </div>
      </div>
      {allowed ? (
        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
          <Check className="w-3 h-3 mr-1" />
          Erlaubt
        </Badge>
      ) : (
        <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
          <X className="w-3 h-3 mr-1" />
          Verweigert
        </Badge>
      )}
    </div>
  );
};

export default function RolePermissions() {
  const roles: AppRole[] = ['owner', 'admin', 'moderator', 'user'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Rollen-Berechtigungen
        </CardTitle>
        <CardDescription>
          Übersicht aller Berechtigungen pro Rolle
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="owner" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6">
            {roles.map(role => {
              const info = ROLE_INFO[role];
              const Icon = info.icon;
              return (
                <TabsTrigger 
                  key={role} 
                  value={role}
                  className="flex items-center gap-2"
                >
                  <Icon className={`w-4 h-4 ${info.color}`} />
                  <span className="hidden sm:inline">{info.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
          
          {roles.map(role => {
            const info = ROLE_INFO[role];
            const Icon = info.icon;
            const permissions = ROLE_PERMISSIONS[role];
            const allowedCount = permissions.filter(p => p).length;
            
            return (
              <TabsContent key={role} value={role}>
                <div className={`p-4 rounded-lg ${info.bgColor} mb-6`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full bg-background`}>
                      <Icon className={`w-6 h-6 ${info.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{info.label}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{info.description}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary">
                          {allowedCount} von {PERMISSIONS.length} Berechtigungen
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  {PERMISSIONS.map((permission, index) => (
                    <PermissionRow
                      key={permission.name}
                      permission={permission}
                      allowed={permissions[index]}
                    />
                  ))}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
}
