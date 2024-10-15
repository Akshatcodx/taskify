import { useEffect } from "react";
import useSpeech from "../Custom Hooks/useSpeech";

const SpeechToText = ({
  handleOnSpeechChange,
  fieldName,
}: {
  handleOnSpeechChange: (fieldName: string, value: string) => void;
  fieldName: string;
}) => {
  const { stopListening, startListening, isListening, transcript } =
    useSpeech();
  useEffect(() => {
    handleOnSpeechChange(fieldName, transcript);
  }, [transcript]);
  console.log(transcript, "This is transcript inside transcript");
  return (
    <div>
      <img
        style={{ width: "48px", height: "41px" }}
        src={isListening ? "images/rec.png" : "images/microphone.png"}
        onClick={isListening ? stopListening : startListening}
      />
      {/* <button
        type="button"
        onClick={isListening ? stopListening : startListening}
      >
        {isListening ? "Stop Listening" : "Start Listening"}
      </button> */}
    </div>
  );
};

export default SpeechToText;
