export const validEmail = {
    ruleLabel: "Cette adresse mail n'est pas valide.",
    rule: new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
    //'^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'
}

export const validPassword = {
    ruleLabel: "Minimum : 8 car, 1 min, 1 MAJ, 1 special car et 1 digit",
    rule: new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$')
    //'^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'
}