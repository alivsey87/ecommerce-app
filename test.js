function highestRank(arr) {
  const nums = {};
  let value = 0;
  let count = 0;
  for (let num of arr)
    if (!nums[num]) nums[num] = 1;
    else nums[num]++;
  for (let num in nums) {
    if (nums[num] >= count && +num > value) {
        value = +num;
        count = nums[num];
    }
  }
  return value;
}


let arr = [12, 10, 8, 12, 7, 6, 4, 10, 12, 10];
console.log(highestRank(arr));
