export type ExercicioProps = {
    id: string;
    titulo: string;
    musculoprincipal: string;
    musculosecundario: string;
    equipamento: string;
    series: string[];
    execucao: string;
    imagemUrl: string;
};

export const listaExerciciosGeral: ExercicioProps[] = [
{
    id: "1",
    titulo: "Supino Reto",
    musculoprincipal: "peito",
    musculosecundario: "triceps",
    equipamento: "barra",
    series: ["15x70kg", "14x75kg", "13x80kg"],
    execucao: "Deite-se no banco, segure a barra com os braços alinhados e desça até ao peito com controlo.",
    imagemUrl: "https://www.hipertrofia.org/blog/wp-content/uploads/2017/09/barbell-bench-press.gif"
},
{
    id: "2",
    titulo : "Supino inclinado com halteres",
    musculoprincipal: "peito",
    musculosecundario: "triceps",
    equipamento: "halteres",
    series:  ["15x20kg", "14x25kg", "13x30kg"],
    execucao: "Deite-se no banco inclinado a 30 graus, segure os halteres um em cada braço e com as palmas das mãos num angulo de 45 graus e desça até ao peito com controlo.",
    imagemUrl:"https://www.hipertrofia.org/blog/wp-content/uploads/2023/09/barbell-incline-bench-press.gif",
},
{
    id: "3",
    titulo: "Agachamento",
    musculoprincipal: "quadriceps",
    musculosecundario: "gluteos",
    equipamento: "barra",
    series:  ["15x90kg", "14x95kg", "13x100kg", "12x110kg"],
    execucao: "manter os pés afastados na largura dos ombros ou quadris, com as pontas viradas ligeiramente para fora, e empurrar o quadril para trás como se fosse sentar numa cadeira",
    imagemUrl: "https://www.hipertrofia.org/blog/wp-content/uploads/2024/07/barbell-high-bar-squat.gif",
},
{
    id: "4",
    titulo: "Rosca direta com halteres",
    musculoprincipal: "biceps",
    musculosecundario: "antebraço",
    equipamento: "halteres",
    series:  ["15x10kg", "14x12kg", "13x14kg"],
    execucao: "Mantenha os cotovelos junto ao corpo, contraia o bíceps e eleve os halteres até à altura dos ombros.",
    imagemUrl:"https://www.hipertrofia.org/blog/wp-content/uploads/2019/04/rosca-simultanea.gif",
},
{
    id: "5",
    titulo: "Remada Serrote",
    musculoprincipal: "costas",
    musculosecundario: "triceps",
    equipamento: "halteres",
    series:  ["15x8kg", "14x10kg", "13x12kg"],
    execucao: "posicionar um joelho e a mão do mesmo lado sobre um banco, enquanto mantém a coluna reta e o abdômen ativado para estabilizar o tronco. Com a outra mão, puxe o halter em direção ao quadril, mantendo o cotovelo próximo ao corpo e evitando movimentos bruscos ou rotação do tronco",
    imagemUrl:"https://www.hipertrofia.org/blog/wp-content/uploads/2023/11/dumbbell-one-arm-bentover-row.gif"
},
    {
    id: "6",
    titulo: "Stif",
    musculoprincipal: "posterior_coxa",
    musculosecundario: "gluteos",
    equipamento: "barra",
    series:  ["15x40kg", "14x45kg", "13x50kg"],
    execucao: "Fique em pé com os pés na largura dos quadris e os dedos apontando para frente. Segure a barra com uma pegada por cima, mãos na largura dos ombros. Mantendo as pernas retas, mas não travadas, incline-se para a frente nos quadris, abaixando a barra em direção ao chão. Abaixe a barra até sentir um alongamento nos isquiotibiais, mas certifique-se de manter a coluna neutra e evitar arquear as costas. Contraia os isquiotibiais e glúteos para levantar a barra de volta à posição em pé. Repita pelo número desejado de repetições." ,
    imagemUrl:"https://www.hipertrofia.org/blog/wp-content/uploads/2023/04/barbell-straight-leg-deadlift.gif"
},
    {
    id: "7",
    titulo: "Mesa flexora",
    musculoprincipal: "posterior_coxa",
    musculosecundario: "gemeos",
    equipamento: "máquina",
    series:  ["15x40kg", "14x45kg", "13x50kg"],
    execucao: "Garantindo que as pernas estão totalmente esticadas e pés neutros (sem estar apontados para uma direção em particular), inicie a subida da carga. Levante a carga até o suporte das pernas encostar nos glúteos ou os músculos posteriores flexionarem completamente. Tronco e pernas nunca perdem o contato com a mesa flexora. Desça a carga até a posição inicial. Repita pelo número desejado de repetições." ,
    imagemUrl:"https://www.hipertrofia.org/blog/wp-content/uploads/2018/09/mesa-flexora.gif"
},
];
