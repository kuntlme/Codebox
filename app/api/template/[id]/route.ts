import { readTemplateStructureFromJson, saveTemplateStructureToJson } from "@/features/playground/lib/path-to-json";
import { db } from "@/lib/db";
import {  templatePaths } from "@/lib/template";
import path from "path";
import fs from "fs/promises"
import { NextRequest } from "next/server";

function validateJsonStucture(data: unknown): boolean{
    try{
        JSON.parse(JSON.stringify(data));
        return true;
    } catch(error){
        console.error("Invalid JSON stucture", error);
        return false;
    }
}

export async function GET(reqquest: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!id) {
        return Response.json({ error: "Missing Playground ID" }, { status: 400 })
    }

    const playground = await db.playground.findUnique({
        where: {id}
    })

    if(!playground){
        return Response.json({error: "Playground not found"}, {status: 404});
    }

    const templateKey = playground.template as keyof typeof templatePaths;
    const templatePath = templatePaths[templateKey];
    if(!templatePath){
        return Response.json({error: "Invalid template"}, {status: 404});
    }

    try {
        const inputPath = path.join(process.cwd(), templatePath);
        const outputFile = path.join(process.cwd(), "output/${templateKey}.json");
        await saveTemplateStructureToJson(inputPath, outputFile);
        const result = await readTemplateStructureFromJson(outputFile);
        if(!validateJsonStucture(result)){
            return Response.json({error: "Invalid JSON stucture"}, {status: 500});
        }

        await fs.unlink(outputFile);
        return Response.json({success: true, templateJson: result}, {status: 200});
    } catch (error) {
        console.error("Error generating template JSON:", error);
        return Response.json({error: "Failed to generate template"}, {status: 500});
    }
}