"use client";

import { apiBaseUrl } from "@modules/configs/url";
import { ResponseTemplate } from "../api/db";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@modules/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@modules/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { JSX, useState } from "react";
import { Input } from "@modules/components/ui/input";
import { Button } from "@modules/components/ui/button";
import { ToastAction } from "@modules/components/ui/toast";
import { useToast } from "@modules/hooks/use-toast";

const FormSchema = z.object({
  name: z.string(),
  answers: z.array(z.string()),
});

const FormCorrectionSchema = z.object({
  diagnosis: z.string().nonempty(),
});

export default function Questions(props: {
  questions: Array<string>;
}): JSX.Element {
  const [session, setSession] = useState<"Q" | "R">("Q");
  const [diagnosis, setDiagnosis] = useState<{ diagnosis: string; id: string }>(
    { diagnosis: "", id: "" }
  );
  const [isCorrection, setIsCorrection] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit() {
    const { name, answers } = form.getValues();
    const questions = answers.map((answer) => parseInt(answer));
    const res = await fetch(`${apiBaseUrl}/v1/analyzes`, {
      method: "POST",
      body: JSON.stringify({ name, questions }),
    });
    const { data } = await (res.json() as Promise<
      ResponseTemplate<{ diagnosis: string; id: string }, null>
    >);

    if (!data) {
      return;
    }

    setSession("R");
    setDiagnosis({
      diagnosis: data.diagnosis,
      id: data.id,
    });
  }

  const correctionForm = useForm<z.infer<typeof FormCorrectionSchema>>({
    resolver: zodResolver(FormCorrectionSchema),
  });

  async function onCorrectionSubmit() {
    const res = await fetch(
      `${apiBaseUrl}/v1/analyzes/${diagnosis.id}/correct-diagnosis`,
      {
        method: "PATCH",
        body: JSON.stringify({
          diagnosis: correctionForm.getValues().diagnosis,
        }),
      }
    );

    if (res.ok) {
      toast({
        title: "Berhasil",
        description: "Diagnosis berhasil dikoreksi",
        action: <ToastAction altText={"Tutup"}>{"Tutup"}</ToastAction>,
      });

      setIsCorrection(false);
      setDiagnosis((prev) => ({
        ...prev,
        diagnosis: correctionForm.getValues().diagnosis,
      }));
    }
  }

  if (session === "Q")
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={"flex flex-col gap-2"}
        >
          <h1>{"Pertanyaan"}</h1>

          <FormField
            name="name"
            render={() => (
              <FormItem>
                <FormLabel>{"Nama"}</FormLabel>
                <Input {...form.register("name")} />
              </FormItem>
            )}
          />

          {props.questions.map((question, index) => {
            return (
              <FormField
                key={index}
                name={`answers[${index}]`}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>{`${index + 1}. ${question}`}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-8"
                      >
                        <FormItem
                          className={"flex items-center space-x-3 space-y-0"}
                        >
                          <FormControl>
                            <RadioGroupItem value={"1"} />
                          </FormControl>
                          <FormLabel className={"font-normal"}>
                            {"Ya"}
                          </FormLabel>
                        </FormItem>

                        <FormItem
                          className={"flex items-center space-x-3 space-y-0"}
                        >
                          <FormControl>
                            <RadioGroupItem value={"0"} />
                          </FormControl>
                          <FormLabel className={"font-normal"}>
                            {"Tidak"}
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}

          <div className="flex gap-2 w-full">
            <Button type="submit">Submit</Button>
            {/* <Button
              type="reset"
              variant={"ghost"}
              onClick={() => {
                form.reset();
              }}
            >
              Reset
            </Button> */}
          </div>
        </form>
      </Form>
    );

  return (
    <div className={"w-full flex flex-col gap-4"}>
      <h1>{"Diagnosis"}</h1>
      <div className="flex flex-col gap-1">
        <p>{`Diagnosis: ${diagnosis.diagnosis}`}</p>
        <p>{`ID: ${diagnosis.id}`}</p>
      </div>

      <div className="flex gap-4 w-full">
        <Button onClick={() => setSession("Q")}>Kembali</Button>
        <Button onClick={() => setIsCorrection(true)} variant={"ghost"}>
          Koreksi
        </Button>
      </div>

      {isCorrection && (
        <div className={"mt-8"}>
          <h1>{"Koreksi"}</h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onCorrectionSubmit)}
              className={"flex flex-col gap-2"}
            >
              <FormField
                name="diagnosis"
                render={() => (
                  <FormItem>
                    <FormLabel>{"Diagnosis"}</FormLabel>
                    <Input {...correctionForm.register("diagnosis")} />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
