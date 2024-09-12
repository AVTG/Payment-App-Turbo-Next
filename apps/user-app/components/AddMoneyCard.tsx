"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/Select";
import { useState } from "react";
import { TextInput } from "@repo/ui/TextInput";
import { OnRampTransactionAction } from "../app/lib/actions/onRampTransactionAction";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {

    const [amount, setAmount] = useState("0");
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl || "");
    return <Card title="Add Money" >
    <div className="w-full">
        <TextInput label={"Amount"} placeholder="Amount" onChange={(value) => {
            setAmount(value)
        }} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            setAmount(value)
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={async() => {
                await OnRampTransactionAction((Number(amount))*100, provider)

                window.location.href = redirectUrl || "";
            }}>
            Add Money
            </Button>
        </div>
    </div>
</Card>
}