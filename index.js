/* provided js */

'use strict';

import { Test } from "./src/Test.js";

// Create the Test and add a button to the UI for running the test
const test = new Test();
const canvas = document.getElementById('button-container');

test.render(canvas);