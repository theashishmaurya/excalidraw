'use client';

import dynamic from 'next/dynamic';
import { useExcalidraw } from './use-excalidraw';
import type { File } from '@prisma/client';
import type {  Collaborator, ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import { useEffect, useState } from 'react';
import { ExcalidrawContent } from '@/lib/types';

const Excalidraw = dynamic(
  async () => (await import('@excalidraw/excalidraw')).Excalidraw,
  {
    ssr: false,
  }
);

interface ExcalidrawEditorProps {
  file: File | null;
}

export function ExcalidrawEditor({ file }: ExcalidrawEditorProps) {
  const { elements, appState, onChange ,setElements,setAppState,setExcalidrawAPI,excalidrawAPI} = useExcalidraw(file);


  useEffect(()=>{
    if(file){
      const content = file.content as unknown as ExcalidrawContent;

      excalidrawAPI?.updateScene({
        elements:content.elements,
        appState: content.appState  ? {...content.appState ,collaborators:[] as unknown as Map<string, Collaborator> } :undefined
      })
      setElements(content.elements ||[])
      setAppState(content.appState || null)
     
    }
    
  },[file])

  if (!file) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Select a file to start editing</p>
      </div>
    );
  }


  return (
    <div className="w-full h-full">
      <Excalidraw
        initialData={{
          elements,
          appState: appState ? {...appState,collaborators:[] as unknown as Map<string, Collaborator> | undefined }: undefined,
          scrollToContent:true
        }}
        isCollaborating={false}
        onChange={onChange}
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        
      />
    </div>
  );
}