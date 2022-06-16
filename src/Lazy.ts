/**
 * Allows for the adition of function and for chaining of calls
 */
export class Lazy {
  functions: { fn: Function; args: any }[] = []

  /**
   * Add a functions for evaluation.
   *
   * @param func
   * @param args
   * @returns {Lazy}
   */
  add(func: Function, ...args: any) {
    this.functions.push({ fn: func, args })
    return this
  }

  /**
   * Evaluated arguments against piped functions
   *
   * Returns a list with results from evaluation each element through the pipe
   *
   * @param target
   * @returns {any[]}
   */
  evaluate(target: any[]) {
    const results: any[] = []

    for (const arg of target) {
      let pipeResult = 0
      let isPiping = false // helps indicate whether to use the target arg or the piped result in the next func call

      for (const item of this.functions) {
        if (item.args) {
          pipeResult = item.fn(...item.args, isPiping ? pipeResult : arg)
        } else {
          pipeResult = item.fn(isPiping ? pipeResult : arg)
        }
        isPiping = true
      }

      results.push(pipeResult)
    }

    return results
  }
}
