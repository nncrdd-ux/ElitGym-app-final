export type ExercicioProps = {
    id: string;
    titulo: string;
    musculoprincipal: string;
    musculosecundario: string;
    equipamento: string;
    series: string;
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
    series: "4x10",
    execucao: "Deite-se no banco, segure a barra com os braços alinhados e desça até ao peito com controlo.",
    imagemUrl: "https://www.hipertrofia.org/blog/wp-content/uploads/2017/09/barbell-bench-press.gif"
},
{
    id: "2",
    titulo : "Supino inclinado com halteres",
    musculoprincipal: "peito",
    musculosecundario: "triceps",
    equipamento: "halteres",
    series: "3x12",
    execucao: "Deite-se no banco inclinado a 30 graus, segure os halteres um em cada braço e com as palmas das mãos num angulo de 45 graus e desça até ao peito com controlo.",
    imagemUrl:"https://www.hipertrofia.org/blog/wp-content/uploads/2023/09/barbell-incline-bench-press.gif",
},
{
    id: "3",
    titulo: "Agachamento",
    musculoprincipal: "quadriceps",
    musculosecundario: "gluteos",
    equipamento: "barra",
    series: "4x12",
    execucao: "manter os pés afastados na largura dos ombros ou quadris, com as pontas viradas ligeiramente para fora, e empurrar o quadril para trás como se fosse sentar numa cadeira",
    imagemUrl: "https://www.hipertrofia.org/blog/wp-content/uploads/2024/07/barbell-high-bar-squat.gif",
},
{
    id: "4",
    titulo: "Rosca direta com halteres",
    musculoprincipal: "biceps",
    musculosecundario: "antebraço",
    equipamento: "halteres",
    series: "3x12",
    execucao: "Mantenha os cotovelos junto ao corpo, contraia o bíceps e eleve os halteres até à altura dos ombros.",
    imagemUrl:"https://www.hipertrofia.org/blog/wp-content/uploads/2019/04/rosca-simultanea.gif",
},
{
    id: "5",
    titulo: "Remada Serrote",
    musculoprincipal: "costas",
    musculosecundario: "triceps",
    equipamento: "halteres",
    series: "3x12",
    execucao: "posicionar um joelho e a mão do mesmo lado sobre um banco, enquanto mantém a coluna reta e o abdômen ativado para estabilizar o tronco. Com a outra mão, puxe o halter em direção ao quadril, mantendo o cotovelo próximo ao corpo e evitando movimentos bruscos ou rotação do tronco",
    imagemUrl:"https://www.hipertrofia.org/blog/wp-content/uploads/2023/11/dumbbell-one-arm-bentover-row.gif"
}
];