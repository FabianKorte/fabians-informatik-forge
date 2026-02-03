import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBitCalculator } from '@/hooks/useBitCalculator';
import { NumberConverter } from './NumberConverter';
import { BitwiseCalculator } from './BitwiseCalculator';
import { ByteConverter } from './ByteConverter';
import { ExercisePanel } from './ExercisePanel';
import { Binary, Zap, HardDrive, BookOpen } from 'lucide-react';

export function BitCalculatorTool() {
  const {
    state,
    setActiveTab,
    setInputValue,
    setInputBase,
    setOperandA,
    setOperandB,
    setSelectedOperation,
    setShiftAmount,
    calculateBitwise,
    setByteValue,
    setByteUnit,
    startExercise,
    setUserAnswer,
    toggleHint,
    checkAnswer,
    isAnswerCorrect,
    closeExercise,
    getExerciseProgress,
    exercises,
  } = useBitCalculator();

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Bit-/Byte-Rechner
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Konvertiere zwischen Zahlensystemen, führe bitweise Operationen durch
          und rechne Speichergrößen um. Mit interaktiven Übungen zum Lernen!
        </p>
      </div>

      <Tabs 
        value={state.activeTab} 
        onValueChange={(v) => setActiveTab(v as typeof state.activeTab)}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="converter" className="gap-2">
            <Binary className="h-4 w-4" />
            <span className="hidden sm:inline">Konverter</span>
          </TabsTrigger>
          <TabsTrigger value="bitwise" className="gap-2">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Bitweise</span>
          </TabsTrigger>
          <TabsTrigger value="bytes" className="gap-2">
            <HardDrive className="h-4 w-4" />
            <span className="hidden sm:inline">Bytes</span>
          </TabsTrigger>
          <TabsTrigger value="exercises" className="gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Übungen</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="converter">
          <NumberConverter
            inputValue={state.inputValue}
            inputBase={state.inputBase}
            conversionResult={state.conversionResult}
            onInputChange={setInputValue}
            onBaseChange={setInputBase}
          />
        </TabsContent>

        <TabsContent value="bitwise">
          <BitwiseCalculator
            operandA={state.operandA}
            operandB={state.operandB}
            selectedOperation={state.selectedOperation}
            shiftAmount={state.shiftAmount}
            result={state.bitwiseResult}
            onOperandAChange={setOperandA}
            onOperandBChange={setOperandB}
            onOperationChange={setSelectedOperation}
            onShiftAmountChange={setShiftAmount}
            onCalculate={calculateBitwise}
          />
        </TabsContent>

        <TabsContent value="bytes">
          <ByteConverter
            value={state.byteValue}
            unit={state.byteUnit}
            results={state.byteResults}
            onValueChange={setByteValue}
            onUnitChange={setByteUnit}
          />
        </TabsContent>

        <TabsContent value="exercises">
          <ExercisePanel
            exercises={exercises}
            completedExercises={state.exerciseCompleted}
            earnedPoints={state.earnedPoints}
            currentExercise={state.currentExercise}
            userAnswer={state.userAnswer}
            showHint={state.showHint}
            onStartExercise={startExercise}
            onAnswerChange={setUserAnswer}
            onToggleHint={toggleHint}
            onCheckAnswer={checkAnswer}
            isAnswerCorrect={isAnswerCorrect}
            onCloseExercise={closeExercise}
            progress={getExerciseProgress()}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
