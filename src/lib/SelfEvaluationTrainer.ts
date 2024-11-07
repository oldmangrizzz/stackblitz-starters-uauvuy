import { ThoughtType, CognitiveProcessor } from './CognitiveProcessor';
import HDComputing from './HDComputing';
import * as tf from '@tensorflow/tfjs';

interface TrainingMetrics {
  accuracy: number;
  creativity: number;
  efficiency: number;
  adaptability: number;
  coherence: number;
}

interface TrainingFeedback {
  metrics: TrainingMetrics;
  improvements: Map<ThoughtType, number>;
  confidenceScore: number;
}

export class SelfEvaluationTrainer {
  private cognitiveProcessor: CognitiveProcessor;
  private hdComputing: HDComputing;
  private learningRate: number = 0.01;
  private historyWindow: TrainingFeedback[] = [];
  private readonly maxHistorySize = 1000;

  constructor(cognitiveProcessor: CognitiveProcessor, hdComputing: HDComputing) {
    this.cognitiveProcessor = cognitiveProcessor;
    this.hdComputing = hdComputing;
  }

  async evaluatePerformance(
    input: tf.Tensor,
    expectedOutput: tf.Tensor
  ): Promise<TrainingFeedback> {
    const output = await this.cognitiveProcessor.process(input, {});
    
    // Calculate base metrics
    const metrics = await this.calculateMetrics(output, expectedOutput);
    
    // Analyze thought pattern effectiveness
    const improvements = await this.analyzeThoughtPatterns(input, output);
    
    // Calculate overall confidence
    const confidenceScore = await this.calculateConfidence(metrics);

    const feedback = {
      metrics,
      improvements,
      confidenceScore
    };

    this.updateHistory(feedback);
    await this.adapt(feedback);

    return feedback;
  }

  private async calculateMetrics(
    output: tf.Tensor,
    expected: tf.Tensor
  ): Promise<TrainingMetrics> {
    const accuracy = await this.calculateCosineSimilarity(output, expected);
    
    // Measure creativity through pattern uniqueness
    const creativity = await this.measureCreativity(output);
    
    // Calculate processing efficiency
    const efficiency = await this.calculateEfficiency(output);
    
    // Measure adaptability through pattern variation
    const adaptability = await this.calculateAdaptability();
    
    // Measure coherence of thought patterns
    const coherence = await this.measureCoherence(output);

    return {
      accuracy,
      creativity,
      efficiency,
      adaptability,
      coherence
    };
  }

  private async calculateCosineSimilarity(a: tf.Tensor, b: tf.Tensor): Promise<number> {
    const dotProduct = tf.sum(tf.mul(a, b));
    const normA = tf.norm(a);
    const normB = tf.norm(b);
    const similarity = tf.div(dotProduct, tf.mul(normA, normB));
    return (await similarity.data())[0];
  }

  private async measureCreativity(output: tf.Tensor): Promise<number> {
    // Measure uniqueness compared to historical patterns
    const uniquenessScores = await Promise.all(
      this.historyWindow.map(async (history) => {
        const historicalPattern = await this.cognitiveProcessor.process(
          output,
          { timestamp: history.metrics.timestamp }
        );
        return 1 - await this.calculateCosineSimilarity(output, historicalPattern);
      })
    );

    return uniquenessScores.reduce((acc, score) => acc + score, 0) / 
           (uniquenessScores.length || 1);
  }

  private async calculateEfficiency(output: tf.Tensor): Promise<number> {
    // Measure computational efficiency and resource usage
    const sparsity = tf.countNonZero(output).div(tf.size(output));
    return 1 - (await sparsity.data())[0];
  }

  private async calculateAdaptability(): Promise<number> {
    if (this.historyWindow.length < 2) return 1;

    // Calculate variance in performance over time
    const performances = this.historyWindow.map(h => h.confidenceScore);
    const mean = performances.reduce((a, b) => a + b) / performances.length;
    const variance = performances.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / 
                    performances.length;

    return Math.exp(-variance); // Higher stability = higher adaptability
  }

  private async measureCoherence(output: tf.Tensor): Promise<number> {
    // Measure pattern consistency and logical flow
    const patterns = tf.split(output, output.shape[0] / 100);
    const coherenceScores = await Promise.all(
      patterns.slice(1).map(async (pattern, i) => {
        return this.calculateCosineSimilarity(patterns[i], pattern);
      })
    );

    return coherenceScores.reduce((acc, score) => acc + score, 0) / 
           coherenceScores.length;
  }

  private async analyzeThoughtPatterns(
    input: tf.Tensor,
    output: tf.Tensor
  ): Promise<Map<ThoughtType, number>> {
    const improvements = new Map<ThoughtType, number>();

    for (const type of Object.values(ThoughtType)) {
      const effectiveness = await this.evaluateThoughtPattern(type, input, output);
      improvements.set(type, effectiveness);
    }

    return improvements;
  }

  private async evaluateThoughtPattern(
    type: ThoughtType,
    input: tf.Tensor,
    output: tf.Tensor
  ): Promise<number> {
    // Evaluate effectiveness of each thought pattern
    const patternOutput = await this.cognitiveProcessor.process(input, { 
      forcedPattern: type 
    });
    
    const similarity = await this.calculateCosineSimilarity(output, patternOutput);
    const uniqueness = await this.measureCreativity(patternOutput);
    
    return (similarity + uniqueness) / 2;
  }

  private async calculateConfidence(metrics: TrainingMetrics): Promise<number> {
    const weights = {
      accuracy: 0.3,
      creativity: 0.2,
      efficiency: 0.15,
      adaptability: 0.2,
      coherence: 0.15
    };

    return Object.entries(metrics).reduce(
      (confidence, [key, value]) => confidence + value * weights[key], 
      0
    );
  }

  private updateHistory(feedback: TrainingFeedback): void {
    this.historyWindow.push(feedback);
    if (this.historyWindow.length > this.maxHistorySize) {
      this.historyWindow.shift();
    }
  }

  private async adapt(feedback: TrainingFeedback): Promise<void> {
    // Adjust learning parameters based on feedback
    if (feedback.confidenceScore < 0.5) {
      this.learningRate *= 1.1; // Increase learning rate when struggling
      this.cognitiveProcessor.boostCreativity(1.2);
    } else if (feedback.confidenceScore > 0.8) {
      this.learningRate *= 0.9; // Decrease learning rate when performing well
      this.cognitiveProcessor.normalizeThinking();
    }

    // Optimize thought patterns based on their effectiveness
    feedback.improvements.forEach((effectiveness, type) => {
      if (effectiveness < 0.5) {
        // Boost underperforming patterns
        this.cognitiveProcessor.boostPattern(type, 1.2);
      }
    });
  }

  getPerformanceInsights(): string[] {
    if (this.historyWindow.length === 0) return ['No training data available'];

    const recentPerformance = this.historyWindow.slice(-10);
    const averageConfidence = recentPerformance.reduce(
      (acc, f) => acc + f.confidenceScore, 
      0
    ) / recentPerformance.length;

    const insights = [
      `Average confidence: ${(averageConfidence * 100).toFixed(2)}%`,
      `Learning rate: ${this.learningRate.toFixed(4)}`,
      `Training samples: ${this.historyWindow.length}`
    ];

    // Add pattern-specific insights
    const patternPerformance = new Map<ThoughtType, number>();
    recentPerformance.forEach(feedback => {
      feedback.improvements.forEach((value, key) => {
        patternPerformance.set(
          key, 
          (patternPerformance.get(key) || 0) + value
        );
      });
    });

    patternPerformance.forEach((total, type) => {
      const average = total / recentPerformance.length;
      insights.push(
        `${type} pattern performance: ${(average * 100).toFixed(2)}%`
      );
    });

    return insights;
  }
}

export default SelfEvaluationTrainer;