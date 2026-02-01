import { useSubnetting } from '@/hooks/useSubnetting';
import { SetSelector } from './SetSelector';
import { ChallengeHeader } from './ChallengeHeader';
import { ChallengeView } from './ChallengeView';
import { ResultsView } from './ResultsView';

export function SubnettingTool() {
  const {
    availableSets,
    currentSession,
    currentChallenge,
    userInputs,
    showHint,
    currentHints,
    timeRemaining,
    completedSetIds,
    bestTimes,
    startChallenge,
    submitAnswer,
    setInput,
    showNextHint,
    exitSession,
    resetProgress
  } = useSubnetting();

  // Set selection screen
  if (!currentSession) {
    return (
      <div className="container max-w-5xl py-8">
        <SetSelector
          sets={availableSets}
          completedSetIds={completedSetIds}
          bestTimes={bestTimes}
          onSelect={startChallenge}
          onReset={resetProgress}
        />
      </div>
    );
  }

  const currentSet = availableSets.find(s => s.id === currentSession.setId);
  if (!currentSet) return null;

  // Results screen
  if (currentSession.isCompleted) {
    return (
      <div className="container max-w-5xl py-8">
        <ResultsView
          session={currentSession}
          set={currentSet}
          onRestart={() => startChallenge(currentSession.setId)}
          onExit={exitSession}
        />
      </div>
    );
  }

  // Active challenge
  return (
    <div className="min-h-screen flex flex-col">
      <ChallengeHeader
        setTitle={currentSet.title}
        currentIndex={currentSession.currentChallengeIndex}
        totalChallenges={currentSet.challenges.length}
        currentScore={currentSession.totalScore}
        totalPossible={currentSet.totalPoints}
        timeRemaining={timeRemaining}
        onExit={exitSession}
      />
      
      <div className="flex-1 container max-w-3xl py-8">
        {currentChallenge && (
          <ChallengeView
            challenge={currentChallenge}
            userInputs={userInputs}
            showHint={showHint}
            currentHints={currentHints}
            onInputChange={setInput}
            onSubmit={submitAnswer}
            onShowHint={showNextHint}
          />
        )}
      </div>
    </div>
  );
}
