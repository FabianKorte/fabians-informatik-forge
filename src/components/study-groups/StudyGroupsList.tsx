import { useState } from 'react';
import { useStudyGroups } from '@/hooks/useStudyGroups';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Lock, Globe, Plus } from 'lucide-react';
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Lerngruppen</h2>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Gruppe erstellen
        </Button>
      </div>

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

      <CreateGroupDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  );
};
