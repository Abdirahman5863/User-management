import UserState from "@/context";

export default function Commonlayout({children}){
    return <UserState>{children}</UserState>
}