import { useState } from 'react';
import { useStudyGroups } from '@/hooks/useStudyGroups';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Lock, Globe, Plus, ExternalLink, MessageSquare } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { CreateGroupDialog } from './CreateGroupDialog';

export const StudyGroupsList = () => {
  const { groups, joinGroup, isLoading } = useStudyGroups();
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Discord Server Section */}
      <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#5865F2] rounded-lg">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Comcave Fachinformatik Discord</CardTitle>
              <CardDescription>Offizieller Discord-Server von Kevin - Tritt der Community bei!</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="gap-1">
              <Users className="h-3 w-3" />
              Community-Server
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Globe className="h-3 w-3" />
              Öffentlich
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Vernetze dich mit anderen Fachinformatik-Azubis, tausche dich aus, stelle Fragen und 
            lerne gemeinsam für die IHK-Prüfung. Kevin und die Community helfen dir weiter!
          </p>
          <Button 
            className="w-full sm:w-auto bg-[#5865F2] hover:bg-[#4752C4]" 
            onClick={() => window.open('https://discord.gg/6JnzJN72sr', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Discord beitreten
          </Button>
        </CardContent>
      </Card>

      {/* Study Groups Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">Interne Lerngruppen</h2>
            <p className="text-sm text-muted-foreground">Erstelle oder trete eigenen Lerngruppen bei</p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Gruppe erstellen
          </Button>
        </div>

        {groups.length === 0 ? (
          <Card className="p-8 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="font-semibold mb-2">Noch keine Lerngruppen</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Sei der Erste und erstelle eine Lerngruppe
            </p>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Erste Gruppe erstellen
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
          <Card key={group.id} className="p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{group.name}</h3>
                  {group.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {group.description}
                    </p>
                  )}
                </div>
                {group.is_public ? (
                  <Globe className="h-5 w-5 text-green-500" />
                ) : (
                  <Lock className="h-5 w-5 text-orange-500" />
                )}
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {group.member_count || 0} / {group.max_members} Mitglieder
                </span>
              </div>

              <div className="flex gap-2">
                <Badge variant="secondary">
                  {group.is_public ? 'Öffentlich' : 'Privat'}
                </Badge>
              </div>

              <Button
                className="w-full"
                onClick={() => joinGroup(group.id)}
                disabled={(group.member_count || 0) >= group.max_members}
              >
                Beitreten
              </Button>
            </div>
            </Card>
          ))}
        </div>
        )}
      </div>

      <CreateGroupDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  );
};
