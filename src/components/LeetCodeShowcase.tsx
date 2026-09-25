import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, CheckCircle2, Award, Zap, Copy, Check, 
  ExternalLink, ChevronRight, Terminal, BarChart2 
} from 'lucide-react';

interface DsaProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  timeComplexity: string;
  spaceComplexity: string;
  summary: string;
  solutionCode: string;
}

const DSA_PROBLEMS: DsaProblem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum (LeetCode #1)',
    difficulty: 'Easy',
    topic: 'Hash Table / Arrays',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    summary: 'Single-pass HashMap mapping each value to its index to find complement (target - num) in O(1) average lookup time.',
    solutionCode: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Map stores value -> index for O(1) lookup
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`
  },
  {
    id: 'longest-substring',
    title: 'Longest Substring Without Repeating Characters (LeetCode #3)',
    difficulty: 'Medium',
    topic: 'Sliding Window / Two Pointers',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(min(M, N))',
    summary: 'Dynamic sliding window with a HashMap recording last seen indices to advance the left pointer in amortized constant time.',
    solutionCode: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        int maxLength = 0;
        int left = 0;
        Map<Character, Integer> lastSeen = new HashMap<>();
        
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (lastSeen.containsKey(c)) {
                left = Math.max(left, lastSeen.get(c) + 1);
            }
            lastSeen.put(c, right);
            maxLength = Math.max(maxLength, right - left + 1);
        }
        return maxLength;
    }
}`
  },
  {
    id: 'binary-search',
    title: 'Search in Rotated Sorted Array (LeetCode #33)',
    difficulty: 'Medium',
    topic: 'Binary Search',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    summary: 'Modified binary search determining which half of the rotated array is strictly sorted before discarding half the search space.',
    solutionCode: `class Solution {
    public int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            
            // Check if left half is sorted
            if (nums[low] <= nums[mid]) {
                if (target >= nums[low] && target < nums[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else { // Right half is sorted
                if (target > nums[mid] && target <= nums[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        return -1;
    }
}`
  },
  {
    id: 'level-order',
    title: 'Binary Tree Level Order Traversal (LeetCode #102)',
    difficulty: 'Medium',
    topic: 'Trees / BFS',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    summary: 'Breadth-First Search queue processing nodes level-by-level, batching children into grouped sublists.',
    solutionCode: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>(levelSize);
            
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                currentLevel.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            result.add(currentLevel);
        }
        return result;
    }
}`
  }
];

export const LeetCodeShowcase: React.FC = () => {
  const [selectedProblemId, setSelectedProblemId] = useState<string>(DSA_PROBLEMS[0].id);
  const [copied, setCopied] = useState(false);

  const activeProblem = DSA_PROBLEMS.find(p => p.id === selectedProblemId) || DSA_PROBLEMS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeProblem.solutionCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-[var(--paper-2)] border border-[var(--line)] shadow-sm overflow-hidden text-left">
      {/* Top Banner with Solved Metrics */}
      <div className="p-5 bg-[var(--paper-3)] border-b border-[var(--line)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Code2 size={20} />
          </div>
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-2">
              <span>LeetCode Algorithmic Problem Solving</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="text-base font-bold text-[var(--ink)] font-sans mt-0.5">
              150+ Verified Solutions in Java & Object-Oriented Principles
            </div>
          </div>
        </div>

        {/* Breakdown Badges */}
        <div className="flex items-center gap-2.5 flex-wrap font-mono text-xs">
          <div className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
            Easy: 85+
          </div>
          <div className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold">
            Medium: 55+
          </div>
          <div className="px-3 py-1 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-semibold">
            Hard: 12+
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[var(--line)]">
        {/* Left Column: Problem List */}
        <div className="lg:col-span-5 p-4 space-y-2">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--slate)] mb-2 px-1">
            Curated Core Solutions:
          </div>

          {DSA_PROBLEMS.map((prob) => {
            const isSelected = prob.id === selectedProblemId;
            return (
              <button
                key={prob.id}
                onClick={() => {
                  setSelectedProblemId(prob.id);
                }}
                className={`w-full p-3 rounded-xl text-left transition-all cursor-pointer flex items-center justify-between border ${
                  isSelected
                    ? 'bg-[var(--signal-dim)] border-[var(--signal)] shadow-xs'
                    : 'bg-[var(--paper-2)] border-[var(--line)] hover:border-[var(--slate)]/40'
                }`}
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      prob.difficulty === 'Easy' 
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' 
                        : prob.difficulty === 'Medium'
                          ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                          : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                    }`}>
                      {prob.difficulty}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--slate)] truncate">
                      {prob.topic}
                    </span>
                  </div>
                  <div className={`text-xs font-semibold font-sans truncate ${isSelected ? 'text-[var(--signal)]' : 'text-[var(--ink)]'}`}>
                    {prob.title}
                  </div>
                </div>

                <ChevronRight size={15} className={`shrink-0 transition-transform ${isSelected ? 'translate-x-1 text-[var(--signal)]' : 'text-[var(--slate)]'}`} />
              </button>
            );
          })}

          {/* LeetCode Profile Direct Link */}
          <div className="pt-3 px-1">
            <a
              href="https://leetcode.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--signal)] hover:underline"
            >
              <span>Explore full problem-solving journal on LeetCode</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Right Column: Code & Complexity Inspector */}
        <div className="lg:col-span-7 p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h4 className="text-sm font-bold text-[var(--ink)] font-sans">
                  {activeProblem.title}
                </h4>
                <p className="text-xs text-[var(--slate)] mt-1 leading-relaxed">
                  {activeProblem.summary}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--paper-3)] border border-[var(--line)] text-[var(--slate)]">
                  Time: <strong className="text-[var(--ink)]">{activeProblem.timeComplexity}</strong>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--paper-3)] border border-[var(--line)] text-[var(--slate)]">
                  Space: <strong className="text-[var(--ink)]">{activeProblem.spaceComplexity}</strong>
                </span>
              </div>
            </div>

            {/* Code Box */}
            <div className="relative rounded-xl bg-[#0B1117] text-slate-200 border border-slate-800 font-mono text-xs overflow-hidden shadow-inner">
              <div className="flex items-center justify-between px-3.5 py-2 bg-[#161F28] border-b border-slate-800 text-[11px] text-slate-400">
                <span className="text-emerald-400 font-mono">Java Solution • Verified Optimal</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer text-[10px]"
                >
                  {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="p-3.5 overflow-x-auto max-h-64 text-[11.5px] leading-relaxed text-amber-200">
                <pre>{activeProblem.solutionCode}</pre>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono text-[var(--slate)]">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>Tested against LeetCode test suite (100% test pass rate)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
