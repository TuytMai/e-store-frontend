import CustomerProvider from "@/contexts/CustomerContext";

export default function Layout(props: {
    children: React.ReactNode;
    customer: React.ReactNode;
    bill: React.ReactNode;
}) {
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <p className=" font-bold text-2xl">Create new warranty</p>
            <div className="flex-1 grid grid-cols-1 items-stretch gap-6 overflow-auto pr-2">
                <CustomerProvider>
                    {props.customer}
                    {props.bill}
                </CustomerProvider>
            </div>
        </div>
    );
}
