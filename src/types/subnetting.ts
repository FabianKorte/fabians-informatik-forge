// Subnetting Challenge Types

export type ChallengeType = 
  | 'subnet-mask'      // Given CIDR, calculate subnet mask
  | 'network-address'  // Given IP and mask, find network address
  | 'broadcast'        // Given IP and mask, find broadcast address
  | 'host-count'       // Calculate number of usable hosts
  | 'cidr-notation'    // Convert subnet mask to CIDR
  | 'first-last-host'  // Find first and last usable host
  | 'mixed';           // Combination challenge

export type Difficulty = 'anfaenger' | 'fortgeschritten' | 'experte';

export interface SubnettingChallenge {
  id: string;
  type: ChallengeType;
  difficulty: Difficulty;
  question: string;
  givenData: {
    ip?: string;
    cidr?: number;
    subnetMask?: string;
    networkAddress?: string;
  };
  expectedAnswers: {
    subnetMask?: string;
    networkAddress?: string;
    broadcastAddress?: string;
    firstHost?: string;
    lastHost?: string;
    hostCount?: number;
    cidr?: number;
  };
  hints: string[];
  explanation: string;
  timeLimit: number; // seconds
  points: number;
}

export interface ChallengeSet {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  challenges: SubnettingChallenge[];
  totalPoints: number;
  timeLimit: number; // total time for all challenges
  passingScore: number; // percentage needed to pass
}

export interface UserAnswer {
  challengeId: string;
  answers: Record<string, string | number>;
  isCorrect: boolean;
  timeTaken: number;
  pointsEarned: number;
}

export interface ChallengeSession {
  setId: string;
  startTime: number;
  currentChallengeIndex: number;
  answers: UserAnswer[];
  totalScore: number;
  isCompleted: boolean;
  isPassed: boolean;
}

export interface SubnettingState {
  availableSets: ChallengeSet[];
  currentSession: ChallengeSession | null;
  currentChallenge: SubnettingChallenge | null;
  userInputs: Record<string, string>;
  showHint: boolean;
  hintIndex: number;
  timeRemaining: number;
  completedSetIds: string[];
  totalXpEarned: number;
  bestTimes: Record<string, number>; // setId -> best time in seconds
}
