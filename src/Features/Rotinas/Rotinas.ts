export type RotinaProps = {
    id: string;
    titulo: string;
    exercicios: string[];
    selecionada?: boolean;
    concluida?: boolean;
   };

export const listaRotinasGeral: RotinaProps[] = [
{
    id: "1",
    titulo: "Rotina A",
    exercicios: [`1`, `2`],
    selecionada: true,
    concluida: false,
},
{
    id: "2",
    titulo : "Rotina B",
    exercicios: ['3'],
    selecionada: true,
    concluida: false,
},
{
    id: "3",
    titulo: "Rotina C",
    exercicios: ['1', '2', '4', '5'],
    selecionada: false,
    concluida: false,
},
{
    id: "4",
    titulo: "Rotina D",
    exercicios: ['4', '5'],
    selecionada: true,
    concluida: false,
},
];