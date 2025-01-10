import { pipeline } from "@huggingface/transformers";

import { createInputSequence } from "../../utils/task_prefix";

const MODEL_NAME = "aynumosir/mt5-base-ainu-onnx";

let instance;

async function getInstance(progressCallback) {
  if (instance == null) {
    instance = pipeline("text2text-generation", MODEL_NAME, {
      progress_callback: progressCallback,
    });
  }

  return instance;
}

self.addEventListener("message", async (event) => {
  const translator = await getInstance((x) => {
    console.log(x);
    self.postMessage(x);
  });

  const inputSequence = createInputSequence(event.data.text, {
    source: event.data.source,
    target: event.data.target,
    dialect: event.data.dialect,
    pronoun: event.data.pron,
  });

  const output = await translator(inputSequence, {
    max_length: 128,
  });

  console.log(output);

  self.postMessage({
    status: "complete",
    output: output,
  });
});
