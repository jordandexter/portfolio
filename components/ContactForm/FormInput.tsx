import { ChangeEvent } from "react"

interface FormInputProps {
    label: string,
    value: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const FormInput = ({
    label,
    value,
    onChange
}: FormInputProps) => {
    return (
        <div className="flex flex-col w-full gap-1">
            <p className="text-foreground">{label}</p>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e)}
                className="flex px-4 py-1 rounded-[16px] w-full bg-contact-form-inputs text-forground"
            />
        </div>
    )
}