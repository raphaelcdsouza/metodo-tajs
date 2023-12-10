import { describe, it, expect, jest } from '@jest/globals'

import Person from '../src/person.js'

describe('#Person Suite', () => {
  describe('#validate', () => {
    it('should throw if the name is not present', () => {
      // mock é a entrada necessária para que o teste funcione
      const mockInvalidPerson = {
        name: '',
        cpf: '123.456.789-00'
      }

      expect(() => Person.validate(mockInvalidPerson))
        .toThrow(new Error('name is required'))
    })

    it('should throw if the cpf is not present', () => {
      // mock é a entrada necessária para que o teste funcione
      const mockInvalidPerson = {
        name: 'Xuxa da Silva',
        cpf: ''
      }

      expect(() => Person.validate(mockInvalidPerson))
        .toThrow(new Error('cpf is required'))
    })

    it('should not throw if person is valid', () => {
      // mock é a entrada necessária para que o teste funcione
      const mockInvalidPerson = {
        name: 'Xuxa da Silva',
        cpf: '123.456.789-00'
      }

      expect(() => Person.validate(mockInvalidPerson))
        .not
        .toThrow()
    })
  })

  describe('#format', () => {
    // parte do princípio que os dados já foram validados
    it('should format the person name and CPF', () => {
      // AAA

      // Arrange = Preparo
      const mockPerson = {
        name: 'Xuxa da Silva',
        cpf: '000.999.444-11'
      }

      // Act = Executar
      const formattedPerson = Person.format(mockPerson)

      // Assert = Validar
      const expected = {
        name: 'Xuxa',
        cpf: '00099944411',
        lastName: 'da Silva'
      }

      expect(formattedPerson).toStrictEqual(expected)
    })
  })

  describe('#save', () => {
    it('should throw if the person does not have properties cpf, name and lastName', () => {
      const mockInvalidPerson = {
        name: 'Xuxa da Silva',
        cpf: '000.999.444-11'
      }

      expect(() => Person.save(mockInvalidPerson))
        .toThrow(new Error(`cannot save invalid person: ${JSON.stringify(mockInvalidPerson)}`))
    })

    it('should not throw if the person has all properties', () => {
      const mockValidPerson = {
        name: 'Xuxa da Silva',
        cpf: '000.999.444-11',
        lastName: 'da Silva'
      }

      expect(() => Person.save(mockValidPerson))
        .not
        .toThrow()
    })
  })

  describe('#process', () => {
    it('should process a valid person', () => {
      // Uma outra ideia é não restestar o que já foi testado

      // AAA = Arrange, Act, Assert

      // Arrange
      const mockPerson = {
        name: 'Zezin da Silva',
        cpf: '123.456.789-00'
      }

      jest
        .spyOn(
          Person,
          Person.validate.name
        )
        .mockReturnValue()
        // .mockImplementation(() => {
        //   throw new Error('deu ruim!!')
        // })

      jest
        .spyOn(
          Person,
          Person.format.name
        )
        .mockReturnValue({
          cpf: '12345678900',
          name: 'Zezin',
          lastName: 'da Silva'
        })

      jest
        .spyOn(
          Person,
          Person.save.name
        )
        .mockReturnValue()

      // Act
      const result = Person.process(mockPerson)

      // Assert
      const expected = 'ok'
      expect(result).toStrictEqual(expected)
    })
  })
})