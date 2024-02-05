// recorder.js
// License Creative Commons Attribution-NonCommercial (CC-BY-NC)
// Author IA López. Find me on Twitter and Instagram: @_IA_Lopez
// https://linktr.ee/ialopez

// Variable to hold the CCapture object for screen recording.
let capturer = null;

// Recorder module to encapsulate recording functionalities.
window.recorder = (function() {
    
    let isRecording = false; // Flag to check if recording is in progress
    let startTime; // Variable to store the start time of recording
    let frameRate = 30; // Frame rate for the recording, initially set to 30 frames per second
    let maxRecordingDuration = 10000; // Maximum recording duration in milliseconds, initially set to 10000ms (10 seconds)

    // Initialize the CCapture object with specified settings.
    function initializeCapturer() {
        if (!isRecording) {
            capturer = new CCapture({
                format: 'webm', // Setting the recording format to webm
                framerate: frameRate // Setting the frame rate for recording
            });
        }
    }

    // Handle the recording process for each frame.
    function handleRecording() {
        if (isRecording) {
            // Capturing the current frame from the default p5.js canvas
            capturer.capture(document.getElementById('defaultCanvas0'));
            
            let recordingTime = millis() - startTime; // Calculating the elapsed recording time
            console.log("Recording for " + recordingTime + " ms");
            
            // Stop recording if the maximum duration is reached
            if (recordingTime > maxRecordingDuration) {
                console.log("Reached maximum recording duration, stopping recording...");
                toggleRecording(); // Toggle the recording state to stop
            }
        }
    }

    // Toggle the recording state.
    function toggleRecording() {
        if (!isRecording) {
            console.log("Starting recording...");
            startRecording(); // Start recording if not already recording
        } else {
            console.log("Stopping recording...");
            stopRecording(); // Stop recording if currently recording
        }
        isRecording = !isRecording; // Toggle the recording state
    }

    // Start recording.
    function startRecording() {
        if (capturer === null) {
            initializeCapturer(); // Initialize capturer if not already initialized
        }
        capturer.start(); // Start the CCapture object
        startTime = millis(); // Record the start time
    }

    // Stop recording.
    function stopRecording() {
        capturer.stop(); // Stop the CCapture object
        capturer.save(); // Save the recorded file
    }

    // Exporting public functions and setters
    return {
        isRecording: function() {
            return isRecording; // Getter for the recording state
        },
        setFrameRate: function(newRate) {
            frameRate = newRate; // Setter for the frame rate
            if (!isRecording && capturer) {
                // Re-initialize capturer if not currently recording
                initializeCapturer();
            }
        },
        setMaxRecordingDuration: function(newDuration) {
            maxRecordingDuration = newDuration * 1000; // Convert seconds to milliseconds and set the max duration
        },
        toggleRecording, // Expose the toggleRecording function
        handleRecording // Expose the handleRecording function
    };
})();