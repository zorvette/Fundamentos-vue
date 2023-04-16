import { shallowMount } from '@vue/test-utils'
import Indecision from '@/components/Indecision'

describe('Indecision Component', () => {

  let wrapper
  let clgSpy
  let getAnswerSpy

  global.fetch = jest.fn( () => Promise.resolve( {
    json: () => Promise.resolve({ 
      answer: 'yes',
      forced: false,
      image: 'https://yesno.wtf/assets/yes/3-422e51268d64d78241720a7de52fe121.gif'
     })
  }))

  beforeEach (() => {
    wrapper = shallowMount( Indecision )

    clgSpy = jest.spyOn( console, 'log' )

    getAnswerSpy = jest.spyOn ( wrapper.vm, 'getAnswer')
    
    jest.clearAllMocks()
  })


  test ('debe hacer match con el snapshot', () => {
    expect( wrapper.html() ).toMatchSnapshot()
  })

  test('escribir en el input no debe de disparar nada (console.log)', async() => {

    const input = wrapper.find('input')
    await input.setValue('Hola Mundo')

    expect( clgSpy ).toHaveBeenCalledTimes(1)
    expect( getAnswerSpy ).not.toHaveBeenCalled()

    // console.log(wrapper.vm)
  })

  test('escribir el simbolo "?" debe de disparar el getAnswer', async () => {

    const input = wrapper.find('input')
    await input.setValue('Hola Mundo?')

    expect( clgSpy ).toHaveBeenCalledTimes(2)
    expect( getAnswerSpy ).toHaveBeenCalled()

  })

  test('pruebas en getAnswer', async()=> {

    await wrapper.vm.getAnswer()

    const img = wrapper.find('img')
    
    expect( img.exists() ).toBeTruthy()
    expect( wrapper.vm.img ).toBe('https://yesno.wtf/assets/yes/3-422e51268d64d78241720a7de52fe121.gif')
    expect( wrapper.vm.answer ).toBe('Si!')

  })

  test('prueba en getAnswer - Fallo en el API', async() => {

    fetch.mockImplementationOnce( () => Promise.reject(' API is down ') )

    await wrapper.vm.getAnswer()

    const img = wrapper.find('img')

    expect( wrapper.vm.img ).toBeFalsy()
    expect( wrapper.vm.answer ).toBe('No se pudo cargar del API')

  })
})