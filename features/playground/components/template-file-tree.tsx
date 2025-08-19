import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import { FilePlus, FolderPlus, Plus } from "lucide-react";
import React, { useState } from "react";
import TemplateNode from "./template-node";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NewFileDialog } from "./dialogs/new-file-dialog";
import { NewFolderDialog } from "./dialogs/new-folder-dialog";

interface TemplateFile {
  filename: string;
  fileExtension: string;
  content: string;
}

interface TemplateFolder {
  folderName: string;
  items: (TemplateFile | TemplateFolder)[];
}

type TemplateItem = TemplateFile | TemplateFolder;

interface TemplateFileTreeProps {
  data: TemplateItem;
  onFileSelect?: (file: TemplateFile) => void;
  selectedFile?: TemplateFile;
  title?: string;
  onAddFile?: (file: TemplateFile, parentPath: string) => void;
  onAddFolder?: (folder: TemplateFolder, parentPath: string) => void;
  onDeleteFile?: (file: TemplateFile, parentPath: string) => void;
  onDeleteFolder?: (folder: TemplateFolder, parentPath: string) => void;
  onRenameFile?: (
    file: TemplateFile,
    newFilename: string,
    newExtension: string,
    parentPath: string
  ) => void;
  onRenameFolder?: (
    folder: TemplateFolder,
    newFolderName: string,
    parentPath: string
  ) => void;
}

const TemplateFileTree = ({
  data,
  onFileSelect,
  selectedFile,
  title,
  onAddFile,
  onAddFolder,
  onDeleteFile,
  onDeleteFolder,
}: TemplateFileTreeProps) => {
  const isRootFolder = data && typeof data === "object" && "folderName" in data;
  const [isNewFileDialogOpen, setIsNewFileDialogOpen] = useState(false);
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);

  const handleAddRootFile = () => {
    setIsNewFileDialogOpen(true);
  };

  const handleAddRootFolder = () => {
    setIsNewFolderDialogOpen(true);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>FILE EXPLORER</SidebarGroupLabel>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarGroupAction>
                <Plus className="h-4 w-4" />
              </SidebarGroupAction>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleAddRootFolder}>
                <FolderPlus className="h-4 w-4 mr-2" />
                New Folder
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleAddRootFile}>
                <FilePlus className="h-4 w-4 mr-2" />
                New File
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <SidebarGroupContent>
            <SidebarMenu>
              {isRootFolder ? (
                (data as TemplateFolder).items.map((child, index) => (
                  <TemplateNode
                    key={index}
                    item={child}
                    onFileSelect={onFileSelect}
                    selectedFile={selectedFile}
                    level={0}
                    path=""
                    onAddFile={onAddFile}
                    onAddFolder={onAddFolder}
                    onDeleteFile={onDeleteFile}
                    onDeleteFolder={onDeleteFolder}
                    onRenameFile={() => {}}
                    onRenameFolder={(onRenameFolder) => {}}
                  />
                ))
              ) : (
                <TemplateNode
                  item={data}
                  onFileSelect={onFileSelect}
                  selectedFile={selectedFile}
                  level={0}
                  path=""
                  onAddFile={onAddFile}
                  onAddFolder={onAddFolder}
                  onDeleteFile={onDeleteFile}
                  onDeleteFolder={onDeleteFolder}
                  onRenameFile={() => {}}
                  onRenameFolder={() => {}}
                />
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <NewFileDialog
        isOpen={isNewFileDialogOpen}
        onClose={() => setIsNewFileDialogOpen(false)}
        onCreateFile={() => {}}
      />

      <NewFolderDialog
        isOpen={isNewFolderDialogOpen}
        onClose={() => setIsNewFolderDialogOpen(false)}
        onCreateFolder={() => {}}
      />
    </Sidebar>
  );
};

export default TemplateFileTree;
