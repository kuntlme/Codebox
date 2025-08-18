import { useState, useEffect, useCallback } from "react";
import { WebContainer } from "@webcontainer/api"
import { TemplateFolder } from "@/features/playground/types";

interface UseWebContainerProps {
    templateData: TemplateFolder;
}

interface UseWebContainerReturn {
    serverUrl: string | null;
    isLoading: boolean;
    error: string | null;
    instance: WebContainer | null;
    writeFileSync: (path: string, content: string) => Promise<void>;
    destroy: () => void;
}

export const useWebContainer = ({
    templateData
}: UseWebContainerProps) => {
    const [serverUrl, setServerUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [instance, setInstance] = useState<WebContainer | null>(null);

    useEffect(() => {
        let mounted = true;

        async function initializeWebContainer() {
            try {
                const webcontainerInstance = await WebContainer.boot();

                if (!mounted) return;

                setInstance(webcontainerInstance);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to initialize WebContainer", error);
                if (mounted) {
                    setError(error instanceof Error ? error.message : "Failed to initialize WebContainer");
                    setIsLoading(false);
                }
            }
        }

        initializeWebContainer();
        return () => {
            mounted = false;
            if (instance) {
                instance.teardown();
            }
        }
    }, [])

    const writeFileSync = useCallback(async(path: string, content: string): Promise<void> => {
        if(!instance) {
            throw new Error("WebContainer instance is not available");
        }

        try {
            const pathParts = path.split("/");
            const folderPath = pathParts.slice(0, -1).join("/");

            if(folderPath){
                await instance.fs.mkdir(folderPath, {recursive: true});
            }
            
            await instance.fs.writeFile(path, content);
        } catch (error) {
            
        }
    }, [instance])

    const destroy = useCallback(() => {
        if(instance){
            instance.teardown();
            setInstance(null);
            setServerUrl(null);
        }
    }, [instance])

    return {
        destroy,
        error,
        instance,
        isLoading,
        serverUrl,
        writeFileSync,
    }
}