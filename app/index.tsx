import { Text, View } from "react-native";
import { Input } from "../components/Input";
import { SelectInput } from "../components/SelectInput";
import { MainButton } from "../components/Button";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#293241",
      }}
    >
      <Input placeholder={"teste"} type={Text}/>
      <SelectInput placeholder="Teste" type="text"/>
      <MainButton title={"Salvar nota"} add={false}/>
    </View>
  );
}
