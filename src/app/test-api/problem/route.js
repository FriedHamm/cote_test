// app/api/problem/twosum/route.js
import {NextResponse} from 'next/server';

export async function GET(request) {
  const data = {
    difficulty: 2,
    title: "Two Sum 문제",
    content: `
      <h2>문제 설명</h2>
      <p>
        정수 배열 <code>nums</code>와 정수 <code>target</code>이 주어졌을 때, 
        합이 <code>target</code>이 되는 두 수의 인덱스를 반환하는 함수를 작성하세요.
      </p>
      <p>
        단, 동일한 요소를 두 번 사용할 수 없으며, 각 입력에는 정확히 하나의 해결책만 존재한다고 가정합니다.
      </p>
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