import { shallowMount } from '@vue/test-utils'
import Counter from '@/components/Counter'
// import { startCase } from 'lodash'

  describe( 'Counter Component', () => {

    let wrapper

    beforeEach(() => {
      wrapper = shallowMount( Counter )
    })

    test('debe de hacer match con el snapshot', () => {
    
      expect( wrapper.html() ).toMatchSnapshot()
    
    })
    
    test('h2 debe de tener el valor por defecto "Counter"', () => {

      expect(wrapper.find('h2').exists()).toBeTruthy()
      
      const h2 = wrapper.find('h2').text()
      
      expect( h2 ).toBe('Counter')
      
    })
    
    test ('el valor por defecto debe ser 100 en el p', () => {

      // Wrapper
      
      // pTags
      // const pTags = wrapper.findAll('p')
      const value = wrapper.find('[data-testId="counter"]').text()
      
      // expect segundo p === 100
      // expect( pTags[1].text() ).toBe('100')
      expect( value ).toBe('100')
      
    })

    test ('debe de incrementar y decrementar el contador', async() => {

      const [ increaseBtn, decreaseBtn ] = wrapper.findAll('button')

      await increaseBtn.trigger('click')
      await increaseBtn.trigger('click')
      await increaseBtn.trigger('click')

      await decreaseBtn.trigger('click')
      await decreaseBtn.trigger('click')

      const value = wrapper.find('[data-testId="counter"]').text()

      expect ( value ).toBe('101')
    })

    test ('debe de establecer el valor por defecto', () => {

      const { start } = wrapper.props()

      const value = wrapper.find('[data-testId="counter"]').text()

      expect(Number(value)).toBe(start)

    })

    test ('debe de mostrar la prop title', () => {

      const title = 'Hola Mundo!!!'

      const wrapper = shallowMount( Counter, {
        props: {
          title
        }
      })

      expect( wrapper.find( 'h2' ).text()).toBe(title)

    })


  })

