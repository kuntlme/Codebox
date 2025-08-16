"use client";
import Editor, { type Monaco } from "@monaco-editor/react";
import { TemplateFile } from "../types";
import { useEffect, useRef } from "react";
import {
  configureMonaco,
  defaultEditorOptions,
  getEditorLanguage,
} from "../libs/editor-config";

interface PlaygroundEditorProps {
  activeFile: TemplateFile | undefined;
  content: string;
  onContentChange: (value: string) => void;
}

const PlaygroundEditor = ({
  activeFile,
  content,
  onContentChange,
}: PlaygroundEditorProps) => {
  const editorRef = useRef<any>(null);
  const MonacoRef = useRef<Monaco | null>(null);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    MonacoRef.current = monaco;
    configureMonaco(monaco);
    updateEditorLanguage();
  };

  const updateEditorLanguage = () => {
    if (!activeFile || !MonacoRef.current || !editorRef.current) return;
    const model = editorRef.current.getModel();
    if (!model) return;

    const language = getEditorLanguage(activeFile.fileExtension || "");
    try {
      MonacoRef.current.editor.setModelLanguage(model, language);
    } catch (error) {
      console.warn("Failed to set editor language:", error);
    }
  };

  useEffect(() => {
    updateEditorLanguage();
  }, [activeFile]);
  return (
    <div className="h-full relative">
      {/* TODO: ai */}
      <Editor
        height={"100%"}
        value={content}
        onChange={(value) => onContentChange(value || "")}
        onMount={handleEditorDidMount}
        language={
          activeFile
            ? getEditorLanguage(activeFile.fileExtension || "")
            : "plaintext"
        }
        // @ts-expect-error
        options={defaultEditorOptions}
      />
    </div>
  );
};

export default PlaygroundEditor;
