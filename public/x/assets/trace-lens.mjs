// X Trace Lens: curated, pre-authored walkthroughs, NOT an interpreter.
// No input execution, eval, AI calls, network access, dynamic HTML or telemetry.
const DISCLOSURE = 'Pre-authored educational trace. Not executed by X, not independently verified as a compiler trace, and not a model result.';
const TRACES = Object.freeze({
  'function-call': Object.freeze({
    title: 'Calling add(20, 22)',
    source: 'fn add(a: i32, b: i32) -> i32 {\n    return a + b;\n}\n\nfn main() -> i32 {\n    return add(20, 22);\n}',
    steps: Object.freeze([
      { op: 'enter', heading: 'Enter main', explanation: 'The illustration begins at main, the entry function in this example.', bindings: {} },
      { op: 'call', heading: 'Call add', explanation: 'main calls add with 20 and 22. The function parameters a and b receive those values.', bindings: { a: 20, b: 22 } },
      { op: 'add', heading: 'Compute a + b', explanation: 'The addition in add produces 42 from the two illustrative parameter values.', bindings: { a: 20, b: 22, sum: 42 } },
      { op: 'return', heading: 'Return from add', explanation: 'add returns its computed value to the caller, main.', bindings: { value: 42 } },
      { op: 'return', heading: 'Return from main', explanation: 'main returns 42. Run the Rust reference toolchain separately to observe actual execution.', bindings: { value: 42 } },
    ]),
  }),
  arithmetic: Object.freeze({
    title: 'Evaluating 6 × 7',
    source: 'fn main() -> i32 {\n    return 6 * 7;\n}',
    steps: Object.freeze([
      { op: 'enter', heading: 'Enter main', explanation: 'This illustration begins at main, which returns a typed i32 value.', bindings: {} },
      { op: 'literal', heading: 'Read the operands', explanation: 'The expression contains two illustrative integer operands: 6 and 7.', bindings: { left: 6, right: 7 } },
      { op: 'multiply', heading: 'Multiply', explanation: 'The product of 6 and 7 is 42, within the i32 range for this curated example.', bindings: { left: 6, right: 7, product: 42 } },
      { op: 'return', heading: 'Return from main', explanation: 'main returns 42 in the illustration. This page has not run the X compiler.', bindings: { value: 42 } },
    ]),
  }),
});

export function demoIds() {
  return Object.keys(TRACES);
}

export function getTraceSnapshot(programId, requestedIndex = 0) {
  // Own-property validation prevents prototypes or arbitrary input becoming code.
  if (!Object.hasOwn(TRACES, programId)) throw new RangeError('Unknown curated X example');
  const demo = TRACES[programId];
  const numeric = Number(requestedIndex);
  const index = Number.isFinite(numeric)
    ? Math.max(0, Math.min(demo.steps.length - 1, Math.trunc(numeric)))
    : 0;
  const step = demo.steps[index];
  const record = {
    schema: 'x.trace-lens.illustration.v1',
    kind: 'illustrative-not-executed',
    origin: 'pre-authored',
    modelInvoked: false,
    programId,
    step: index + 1,
    totalSteps: demo.steps.length,
    operation: step.op,
    bindings: { ...step.bindings },
    expectedResult: 42,
  };
  return {
    title: demo.title,
    source: demo.source,
    disclosure: DISCLOSURE,
    stepIndex: index,
    totalSteps: demo.steps.length,
    heading: step.heading,
    explanation: step.explanation,
    canPrevious: index > 0,
    canNext: index < demo.steps.length - 1,
    record,
  };
}

export function mountTraceLens(doc = document) {
  const root = doc.querySelector('[data-trace-lens]');
  if (!root) return false;
  const element = name => root.querySelector('[data-trace-' + name + ']');
  const choices = Array.from(root.querySelectorAll('[data-trace-example]'));
  const previous = element('previous');
  const next = element('next');
  const reset = element('reset');
  let programId = 'function-call';
  let stepIndex = 0;
  const render = () => {
    const data = getTraceSnapshot(programId, stepIndex);
    element('title').textContent = data.title;
    element('source').textContent = data.source;
    element('heading').textContent = data.heading;
    element('explanation').textContent = data.explanation;
    element('position').textContent = 'Step ' + (data.stepIndex + 1) + ' of ' + data.totalSteps;
    element('agent').textContent = JSON.stringify(data.record, null, 2);
    element('disclosure').textContent = data.disclosure;
    previous.disabled = !data.canPrevious;
    next.disabled = !data.canNext;
    for (const button of choices) {
      button.setAttribute('aria-pressed', String(button.dataset.traceExample === programId));
    }
  };
  for (const button of choices) {
    button.addEventListener('click', () => {
      if (!demoIds().includes(button.dataset.traceExample)) return;
      programId = button.dataset.traceExample;
      stepIndex = 0;
      render();
    });
  }
  previous.addEventListener('click', () => { stepIndex -= 1; render(); });
  next.addEventListener('click', () => { stepIndex += 1; render(); });
  reset.addEventListener('click', () => { stepIndex = 0; render(); });
  render();
  return true;
}

if (typeof document !== 'undefined') mountTraceLens(document);
