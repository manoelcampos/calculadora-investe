/**
 * Número de amostras para indicar que desejamos apenas a mais recente.
 */
const N = 1 

const anoAtual = () => new Date().getFullYear()

/**
 * Obtém dados temporais de indicadores da economia da API do Banco Central (BCB),
 * Sistema Gerenciador de Séries Temporais (SGS) para o ano atual.
 * 
 * @param serie número da série temporal que deseja consultar.
 *              Cada série fornece dados temporais de um determinado indicador econômico
 * @return json com a resposta da requisição (valores percentuais em escala 0..100)
 * @see https://dadosabertos.bcb.gov.br/dataset/1178-taxa-de-juros---selic-anualizada-base-252/resource/8c602f6b-f253-4de5-942d-0e3396b257d2
 */
const indicadoresBcb = async (numeroSerie) => {
    const urlBase = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${numeroSerie}/dados/ultimos/${N}?formato=json`
    const ano = anoAtual()
    const intervalo = `&dataInicial=01/01/${ano}&dataFinal=31/12/${ano}`
    const url = urlBase + intervalo
    console.log(url)
    try{
        const res = await fetch(url)
        if(!res.ok) {
            throw new Error('Não foi possível obter dados do Banco Central do Brasil.')
        }

        const [ dados ] = await res.json()
        console.log(dados)
        return dados
    }catch(error){
        console.error(error)
    }
}


/**
 * Obtém dados da SELIC acumulada no ano atual (série 1178)
 * @return json com a data e valor percentual da SELIC, como por exemplo: {"data": "19/12/2022", "valor": "13.65"}
 *         (valores percentuais em escala 0..100)
 * @see https://dadosabertos.bcb.gov.br/dataset/1178-taxa-de-juros---selic-anualizada-base-252/resource/8c602f6b-f253-4de5-942d-0e3396b257d2
 */
const selicAcumuladaAno = async () => {
    const numeroSerieSelic = 1178
    return await indicadoresBcb(numeroSerieSelic)
}

/**
 * Obtém dados da TR (Taxa Referencial) acumulada no ano atual (série 226)
 * @return json com a data e valor percentual da SELIC, como por exemplo: {"data": "19/12/2022", "valor": "13.65"}
 *         (valores percentuais em escala 0..100)
 * @see https://dadosabertos.bcb.gov.br/dataset/1178-taxa-de-juros---selic-anualizada-base-252/resource/8c602f6b-f253-4de5-942d-0e3396b257d2
 */
const trAcumuladaAno = async () => {
    const numeroSerieTR = 226
    return await indicadoresBcb(numeroSerieTR)

}

$(async () => {
    const selic = await selicAcumuladaAno()
    $('#selic').val(selic.valor)

    const tr = await trAcumuladaAno()
    $('#tr').val(tr.valor)
})