// app/api/problem/twosum/route.js
import {NextResponse} from 'next/server';

export async function GET(request) {
  const data = {
    difficulty: 2,
    title: "Two Sum",
    content: `
      
<p>
  Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.
</p>
<p>
  You may assume that each input would have exactly one solution, and you may not use the same element twice.
</p>
<p>You can return the answer in any order.</p>

<h2>Examples</h2>
<p><strong>Example 1:</strong></p>
<p>
  Input: <code>nums = [2,7,11,15]</code>, <code>target = 9</code><br>
  Output: <code>[0,1]</code><br>
  Explanation: Because <code>nums[0] + nums[1] == 9</code>, we return <code>[0, 1]</code>.
</p>
<p><strong>Example 2:</strong></p>
<p>
  Input: <code>nums = [3,2,4]</code>, <code>target = 6</code><br>
  Output: <code>[1,2]</code>
</p>
<p><strong>Example 3:</strong></p>
<p>
  Input: <code>nums = [3,3]</code>, <code>target = 6</code><br>
  Output: <code>[0,1]</code>
</p>

<h2>Constraints</h2>
<ul>
  <li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
  <li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
  <li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>
  <li>Only one valid answer exists.</li>
</ul>

<h2>Follow-up</h2>
<p>Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code> time complexity?</p>
    `,
    template: {
      js: `function twoSum(nums, target) {
  // 여기에 코드를 작성하세요.
}`,
      java: `public class Solution {
  public int[] twoSum(int[] nums, int target) {
    // 여기에 코드를 작성하세요.
  }
}`,
      c: `#include <stdio.h>
#include <stdlib.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
  // 여기에 코드를 작성하세요.
}`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
  vector<int> twoSum(vector<int>& nums, int target) {
    // 여기에 코드를 작성하세요.
  }
};`,
      python: `def twoSum(nums, target):
  # 여기에 코드를 작성하세요.
  pass`
    },
    testCases: [
      {
        input: {nums: [2, 7, 11, 15], target: 9},
        expected: [0, 1]
      },
      {
        input: {nums: [3, 2, 4], target: 6},
        expected: [1, 2]
      },
      {
        input: {nums: [3, 3], target: 6},
        expected: [0, 1]
      }
    ]
  };

  return NextResponse.json(data);
}