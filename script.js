// Get the form and result elements
const form = document.getElementById("rope-form");
const resultDiv = document.getElementById("result");

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get the input value and convert it to an array of rope lengths
  const input = document.getElementById("rope-input").value;
  const ropeLengths = input.split(",").map(Number);

  // Calculate the minimum cost
  const minCost = calculateMinimumCost(ropeLengths);

  // Display the result
  resultDiv.textContent = minCost;
});

// Function to calculate the minimum cost of connecting ropes
function calculateMinimumCost(ropeLengths) {
  // Create a priority queue (min-heap) to store rope lengths
  const heap = new MinHeap(ropeLengths);

  // Variable to store the minimum cost
  let minCost = 0;

  // Combine the ropes until there is only one rope left in the heap
  while (heap.size() > 1) {
    // Remove the two smallest ropes from the heap
    const rope1 = heap.extractMin();
    const rope2 = heap.extractMin();

    // Calculate the cost of combining the ropes
    const cost = rope1 + rope2;

    // Add the cost to the total minimum cost
    minCost += cost;

    // Insert the combined rope back into the heap
    heap.insert(cost);
  }

  // Return the minimum cost
  return minCost;
}

// MinHeap class implementation
class MinHeap {
  constructor(arr) {
    this.heap = arr;
    this.buildHeap();
  }

  buildHeap() {
    const n = this.heap.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this.heapifyDown(i, n);
    }
  }

  heapifyDown(i, n) {
    let smallest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && this.heap[left] < this.heap[smallest]) {
      smallest = left;
    }

    if (right < n && this.heap[right] < this.heap[smallest]) {
      smallest = right;
    }

    if (smallest !== i) {
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      this.heapifyDown(smallest, n);
    }
  }

  extractMin() {
    const min = this.heap[0];
    const last = this.heap.length - 1;
    [this.heap[0], this.heap[last]] = [this.heap[last], this.heap[0]];
    this.heap.pop();
    this.heapifyDown(0, last);
    return min;
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  heapifyUp(i) {
    const parent = Math.floor((i - 1) / 2);
    if (parent >= 0 && this.heap[i] < this.heap[parent]) {
      [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
      this.heapifyUp(parent);
    }
  }

  size() {
    return this.heap.length;
  }
}

