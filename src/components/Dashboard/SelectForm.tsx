import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

export default function SelectForm({
  selectedOption,
  changeValue,
  placeholder,
  type,
  list,
}: {
  selectedOption: string;
  changeValue: (value: string, type: string) => void;
  placeholder: string;
  type: string;
  list: string[];
}) {
  return (
    <Select onValueChange={(value) => changeValue(value, type)} defaultValue={selectedOption}>
      <SelectTrigger>
        <div>{selectedOption || placeholder}</div>
      </SelectTrigger>
      <SelectContent>
        {list.map((item, index) => (
          <SelectItem key={index} value={item} className="text-black">
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
