// app/api/mock/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const data = {
    cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
    c: `/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    
}`,
    python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        
`,
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
    java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`,
    testCases: [
      {
        nums: [2, 7, 11, 15],
        target: 9
      },
      {
        nums: [3, 2, 4],
        target: 6
      },
      {
        nums: [3, 3],
        target: 6
      }
    ]
  };

  return NextResponse.json(data);
}