import { type ChangeEvent, useState, useRef, useEffect } from "react";
import Display from "./Display";
import useMakeNotes from "./useMakeNotes";
import useGetNotes from "./getNotes";
import useRemoveNote from "./removeNote";
import { useQueryClient } from "@tanstack/react-query";

export default function Card() {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [scroll, setScroll] = useState(false);
  const [boxShadow, setBoxShadow] = useState("");
  const [savedText, setSavedText] = useState<string>("");
  const getNotes = useGetNotes();
  const queryClient = useQueryClient();

  const onError = (error: Error) => {
    setSavedText(`Error with notes: ${error.message}`);
  };
  const onSuccess = () => {
    setSavedText("Success!");
    queryClient.invalidateQueries({ queryKey: ["notes"] });
  };
  const { mutation: removeMutation } = useRemoveNote({ onError, onSuccess });

  const { mutation } = useMakeNotes({
    onError,
    onSuccess,
  });

  useEffect(() => {
    if (getNotes.status === "success") {
      setText(getNotes.data?.body);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);

    // auto resize
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = textarea?.scrollHeight + "px";

    if (textarea.scrollHeight > 200) {
      textarea.style.overflowY = "scroll";
      setScroll(true);
      textarea.style.height = "200px";
    }
    if (textarea.scrollHeight < 200) {
      setScroll(false);
    }
  };

  const handleSave = () => {
    if (text !== "") {
      mutation.mutate(text);
    }
    if (text === "") {
      setSavedText("Cannot save empty notes :(");
      setTimeout(() => {
        setSavedText("");
      }, 2000);
    }
  };

  const handleRemove = (removeText: string) => {
    removeMutation.mutate(removeText);
  };

  return (
    <Display
      handleChange={handleChange}
      handleSave={handleSave}
      text={text}
      textareaRef={textareaRef}
      scroll={scroll}
      boxShadow={boxShadow}
      setBoxShadow={setBoxShadow}
      savedText={savedText}
      getNotes={getNotes}
      handleRemove={handleRemove}
      setText={setText}
    />
  );
}
