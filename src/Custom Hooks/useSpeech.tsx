import React, { useState, useEffect, useRef } from "react";

const SpeechToText = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const recognitionRef: any = useRef();

  useEffect(() => {
    // Initialize SpeechRecognition once when the component mounts
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    const recognitionInstance = recognitionRef.current;

    recognitionInstance.continuous = true; // Keep listening for continuous speech
    recognitionInstance.interimResults = true; // Capture speech in progress (optional)

    recognitionInstance.onstart = () => {
      console.log("Speech recognition started");
    };

    recognitionInstance.onresult = (event: any) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + transcript + " ");
        } else {
          interimTranscript += transcript;
        }
      }
      console.log("Recognized text:", transcript);
    };

    recognitionInstance.onend = () => {
      console.log("Speech recognition stopped");
      setListening(false); // Update listening state when recognition ends
    };

    setRecognition(recognitionInstance);

    // Cleanup on unmount
    return () => {
      recognitionInstance.stop();
    };
  }, []);

  const startListening = () => {
    recognitionRef.current.start();
    setListening(true);
  };

  const stopListening = () => {
    recognitionRef.current.stop();
    setListening(false);
    setTranscript("");
  };

  return { isListening, startListening, stopListening, transcript };
};

export default SpeechToText;
