"use client";

import { ReactElement, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnswerSchema } from "./validation";
import { createAnswer } from "@/database/actions/answer.action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "../ui/form";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

const AnswerForm = ({
  questionId,
  authorId
}: {
  questionId: string;
  authorId: string;
}): ReactElement => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const { pending } = useFormStatus();
  const editorRef = useRef(null);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: ""
    }
  });

  async function onSubmit(values: z.infer<typeof AnswerSchema>) {
    const error = await createAnswer({
      content: values.answer,
      author: authorId,
      question: questionId,
      path: pathname
    });

    if (error?.error) {
      // TODO: show toast
      return;
    }

    form.reset();

    if (editorRef.current) {
      const editor = editorRef.current as any;
      editor.setContent("");
    }
  }

  return (
    <div className="pt-6">
      <h4 className="paragraph-semibold text-dark400_light800 mb-4">
        Write your answer here
      </h4>

      <Form {...form}>
        <form
          className="flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table"
                      ],
                      toolbar:
                        "undo redo | " +
                        "codesample | bold italic forecolor | alignleft aligncenter |" +
                        "alignright alignjustify | bullist numlist",
                      content_style:
                        "body { font-family:Inter; font-size:16px }",
                      skin: theme === "dark" ? "oxide-dark" : "oxide",
                      content_css: theme === "dark" ? "dark" : "light"
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit text-white"
              disabled={pending}
            >
              {pending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AnswerForm;
