type CheckBoxProps = {
    label: string,
    isSelected: boolean,
    onCheckboxChange: () => void
}

export function CheckBox({label, isSelected, onCheckboxChange}: CheckBoxProps) {
    return (
        <div className="flex flex-row bg-offWhite border-none active:shadow-buttonIn active:border-none">
            <label className="flex flex-row bg-offWhite border-none active:shadow-buttonIn active:border-none">
                <input
                    type="checkbox"
                    name={label}
                    checked={isSelected}
                    onChange={onCheckboxChange}
                    className="flex flex-row bg-offWhite border-none active:shadow-buttonIn active:border-none"
                />
                {label}
            </label>
        </div>
    );
}