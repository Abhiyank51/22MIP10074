import { Log } from './logger.js';

const BASE_SCORES = {
  "Placement": 300,
  "Result": 200,
  "Event": 100
};

const KEYWORD_BOOSTS = {
  "hiring": 80,
  "interview": 70,
  "result": 60,
  "test": 50,
  "exam": 50,
  "review": 35,
  "project": 30,
  "tech-fest": 20,
  "farewell": 10,
  "mid-sem": 25,
  "end-sem": 25
};

export function getPriorityScore(notification) {
  let score = 0;
  let reasons = [];

  // 1. Base Score
  const baseScore = BASE_SCORES[notification.Type] || 0;
  score += baseScore;
  if (baseScore > 0) {
    reasons.push(`Base type is ${notification.Type}`);
  }

  // 2. Keyword Boosts
  const messageLower = (notification.Message || "").toLowerCase();
  let keywordBoost = 0;
  let matchedKeywords = [];
  
  for (const [keyword, boost] of Object.entries(KEYWORD_BOOSTS)) {
    if (messageLower.includes(keyword)) {
      keywordBoost += boost;
      matchedKeywords.push(keyword);
    }
  }
  
  if (keywordBoost > 0) {
    score += keywordBoost;
    reasons.push(`contains keywords: ${matchedKeywords.join(', ')}`);
  }

  // 3. Recency Boost
  // Add a small fractional boost based on timestamp so newer items score slightly higher
  // Timestamp is like "2026-04-22 17:51:30"
  let recencyBoost = 0;
  try {
    const timestampMs = new Date(notification.Timestamp).getTime();
    if (!isNaN(timestampMs)) {
      // 1e11 ms is about 3 years. This provides a subtle 10-20 point recency score difference max.
      recencyBoost = timestampMs / 1e11;
      score += recencyBoost;
    }
  } catch (e) {
    // Ignore invalid timestamps for boost
  }

  // Format reason string
  let reasonString = "Standard priority";
  if (notification.Type === "Placement" && matchedKeywords.length > 0) {
    reasonString = `High priority because it is a Placement notification and contains ${matchedKeywords[0]}-related content.`;
  } else if (reasons.length > 0) {
    reasonString = `Priority based on: ${reasons.join(', ')}.`;
  }

  return {
    score: score,
    reason: reasonString
  };
}

export function sortByPriority(notifications) {
  Log("frontend", "debug", "utils", "Priority sorting started");
  
  const sorted = [...notifications].sort((a, b) => {
    const scoreA = getPriorityScore(a).score;
    const scoreB = getPriorityScore(b).score;
    
    // Sort descending by score
    if (scoreA !== scoreB) {
      return scoreB - scoreA;
    }
    
    // Fallback to recency if scores are exactly equal
    const timeA = new Date(a.Timestamp).getTime() || 0;
    const timeB = new Date(b.Timestamp).getTime() || 0;
    return timeB - timeA;
  });

  Log("frontend", "debug", "utils", "Priority sorting completed");
  return sorted;
}
