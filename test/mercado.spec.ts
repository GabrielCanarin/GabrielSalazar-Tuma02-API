import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';
import { base, faker } from '@faker-js/faker';

describe('MercadoAPI', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api-desafio-qa.onrender.com/docs/#';
  const nomeM = "teste"
  const mercadoId = "0000";


  p.request.setDefaultTimeout(30000);


  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  
  describe('MERCADO', () => {
    it('Retorna as constantes do Mercado', async () => {
        await p
          .spec()
          .get(`${baseUrl}/mercado`)
          .expectStatus(StatusCodes.OK)
          .inspect();
      });
    
    it('Deve criar um novo mercado com categorias e subcategorias vazias', async () => {
        const mercado = {
          nome: `${nomeM}`,
          cnpj: "00.000.000/0000-00",
          endereco: "rua teste, 123",
          mercadoId: "0000"
        };
        await p
          .spec()
          .post(`${baseUrl}/mercado`)
          .withJson(mercado)
          .expectStatus(StatusCodes.OK)
        //   .inspect();
      });

      it('Tenta criar um mercado apenas com o nome', async () => {
        const mercado = {
            nome: `${nomeM}`,

          };
        await p
            .spec()
            .post(`${baseUrl}`)
            .withJson({mercado})
            .expectStatus(StatusCodes.BAD_REQUEST);
            //   .inspect();
        }); 

      it('Deve buscar um mercado pelo ID', async () => {
        const bodyMercado = await p
          .spec()
          .get(`${baseUrl}/mercado/${mercadoId}`)
          .expectStatus(StatusCodes.OK)
          .returns('body');

          console.log(bodyMercado)
      });

      it('Deve deletar um mercado pelo ID', async () => {
        await p
          .spec()
          .delete(`${baseUrl}/mercado/${mercadoId}`)
          .expectStatus(StatusCodes.OK)
        //   .inspect();
      });

      it('Tenta alterar as informações de um mercado não cadastrado', async() =>{
        await p
            .spec()
            .put(`${baseUrl}/-d8cy0ud0cus0duv0sdi`)
            .withBody({
                "nome": `${nomeM}`,
                "cnpj": "00.000.000/0000-00",
                "endereco": 'teste'
            })
            .expectStatus(StatusCodes.NOT_FOUND)
            //   .inspect();
        });

      it('Retorna todos os produtos associados a um mercado específico', async () => {
        await p
          .spec()
          .get(`${baseUrl}/mercado/${mercadoId}/produtos`)
          .expectStatus(StatusCodes.OK)
        //   .inspect();
      });

      it('Deve adicionar um novo produto à subcategoria de frutas de hortifruit do mercado identificado pelo ID', async () => {
        const fruta = {
          nome: "maçã teste",
          valor: "10"
        };
        await p
          .spec()
          .post(`${baseUrl}/mercado/${mercadoId}/produtos/hortifruit/frutas`)
          .withJson(fruta)
          .expectStatus(StatusCodes.OK)
        //   .inspect();
      });

      it('Retorna todos os produtos associados a um mercado específico', async () => {
        await p
          .spec()
          .get(`${baseUrl}/mercado/${mercadoId}/produtos`)
          .expectStatus(StatusCodes.OK)
        //   .inspect();
      });

      it('Deve adicionar um novo produto à subcategoria de aves de açougue do mercado identificado pelo ID', async () => {
        const fruta = {
          nome: "perna galinha teste",
          valor: "15"
        };
        await p
          .spec()
          .post(`${baseUrl}/mercado/${mercadoId}/produtos/acougue/aves`)
          .withJson(fruta)
          .expectStatus(StatusCodes.OK)
        //   .inspect();
      });
      it('Deve adicionar um novo produto à subcategoria de boivinos de açougue do mercado identificado pelo ID', async () => {
        const fruta = {
          nome: "perna boi teste",
          valor: "15"
        };
        await p
          .spec()
          .post(`${baseUrl}/mercado/${mercadoId}/produtos/acougue/boivinos`)
          .withJson(fruta)
          .expectStatus(StatusCodes.OK)
        //   .inspect();
      });
      it('Deve adicionar um novo produto à subcategoria de suinos de açougue do mercado identificado pelo ID', async () => {
        const fruta = {
          nome: "perna porco teste",
          valor: "15"
        };
        await p
          .spec()
          .post(`${baseUrl}/mercado/${mercadoId}/produtos/acougue/suinos`)
          .withJson(fruta)
          .expectStatus(StatusCodes.OK)
        //   .inspect();
      });

      it('Retorna a lista de queijos da categoria frios do mercado especificado pelo ID.', async () => {
        await p
          .spec()
          .get(`${baseUrl}/mercado/${mercadoId}/produtos`)
          .expectStatus(StatusCodes.OK)
        //   .inspect();
      });

      it('Retorna a lista de embutidos da categoria frios do mercado especificado pelo ID.', async () => {
        await p
          .spec()
          .get(`${baseUrl}/mercado/${mercadoId}/produtos/frios/embutidos`)
          .expectStatus(StatusCodes.OK)
        //   .inspect();
      });
      it('Retorna a lista de outros da categoria frios do mercado especificado pelo ID.', async () => {
        const x = await p
          .spec()
          .get(`${baseUrl}/mercado/${mercadoId}/produtos/frios/outros`)
          .expectStatus(StatusCodes.OK)

          console.log(x)
        //   .inspect();
      });

      it('Retorna a lista de farinhas da categoria mercearia do mercado especificado pelo ID.', async () => {
        const x = await p
          .spec()
          .get(`${baseUrl}/mercado/${mercadoId}/produtos/mercearia/farinhas`)
          .expectStatus(StatusCodes.OK)

          console.log(x)
        //   .inspect();
      });
  })
});