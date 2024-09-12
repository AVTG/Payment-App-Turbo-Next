"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/Center";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send Money">
          <div className="min-w-72 pt-2">
            <TextInput
              placeholder="Enter Mobile Number"
              label="Number"
              onChange={(e) => {
                setNumber(e);
              }}
            />
            <TextInput
              placeholder="Amount"
              label="Amount"
              onChange={(e) => {
                setAmount(e);
              }}
            />

            <div className="pt-4 flex justify-center">
              <Button onClick={() => {
                p2pTransfer(number, amount)
              }}>Send</Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
}
