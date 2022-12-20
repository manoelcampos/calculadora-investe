const N = 1 //número de amostras
const selicUrl = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.1178/dados/ultimos/${N}?formato=json`

/**
 * @return json com a data e valor percentual da SELIC, como por exemplo: {"data": "19/12/2022", "valor": "13.65"}
 * @see https://dadosabertos.bcb.gov.br/dataset/1178-taxa-de-juros---selic-anualizada-base-252/resource/8c602f6b-f253-4de5-942d-0e3396b257d2
 */
const selicAcumuladaAno = async () => {
    const ano = new Date().getFullYear()
    const intervalo = `&dataInicial=01/01/${ano}&dataFinal=31/12/${ano}`
    const url = selicUrl + intervalo
    console.log(url)
    try{
        const res = await fetch(url)
        if(!res.ok) {
            throw new Error('Não foi possível obter a cotação atual da SELIC')
        }

        const [ selic ] = await res.json()
        console.log(selic)
        return selic
    }catch(error){
        console.error(error)
    }
}

$(async () => {
    const { valor } = await selicAcumuladaAno()
    $('#selic').val(valor)
})