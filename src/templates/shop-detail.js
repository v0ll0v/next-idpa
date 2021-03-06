import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

import { Link } from 'gatsby'

// import { ReactComponent as CheckIcon } from '../icons/check.svg'

export default ({ data }) => {
  const shop = data.airtable.data
  return (
    <Layout>
      <div className="column is-12">
        <section
          className="hero is-large has-bg-image"
          style={{ backgroundImage: `url('${shop.fileNode[0].thumbnails.full.url}')` }} >
        </section>
      </div>
      <div className="column is-12-mobile is-10-tablet is-offset-1-tablet is-8-widescreen is-offset-2-widescreen is-6-fullhd is-offset-3-fullhd">
        <div className="box sheet">
          <div className="columns is-multiline">
            <div className="column is-12">
              <h1 className="h1">{shop.name}</h1>
            </div>

            <div className="column is-12 has-bottom-margin">
              <p className="extended">{shop.description}</p>
            </div>


            <div className="column is-6 nomargin-last">

              <div className="has-bottom-margin">
                <h2 className="h2 has-margin">Sortiment</h2>
                <ul className="icon-list">
                  {shop.productRange.map((category) => {
                    return <li key={category.data.slug} className="icon-check"><Link to={`/overview?category=${category.data.slug}`} className="body-colour">{category.data.title}</Link></li>
                  })}
                </ul>
              </div>
            
              { shop.specialities != null ?
                <div className="has-bottom-margin">
                  <h2 className="h2 has-margin">Spezialitäten</h2>
                  <p className="extended">{shop.specialities}</p>
                </div>
                :
                null
              }

              { shop.conditionsAccept != null ?
                <div className="has-bottom-margin">
                  <h2 className="h2 has-margin">Entgegennahme</h2>
                  <p className="extended">{shop.conditionsAccept}</p>
                </div>
                :
                null
               }

            </div>

            <div className="column is-6">
              <div className="has-bottom-margin">
                <h2 className="h2 has-margin">Lage</h2>
                <img src="https://source.unsplash.com/l68Z6eF2peA/600x400" alt="a placeholder"/>
              </div>

              <div className="has-bottom-margin">
                <h2 className="h2 has-margin">Öffnungszeiten</h2>

                <table>
                  <tbody>
                    <tr>
                      <td>
                        Montag:</td><td>{ shop.mondayMorning != null ? shop.mondayMorning : 'Geschlossen' },&nbsp;
                        { shop.mondayAfternoon != null ? shop.mondayAfternoon : 'Geschlossen' }
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Dienstag:</td><td>{ shop.tuesdayMorning != null ? shop.tuesdayMorning : 'Geschlossen' },&nbsp;
                        { shop.tuesdayAfternoon != null ? shop.tuesdayAfternoon : 'Geschlossen' }
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Mittwoch:</td><td>{ shop.wednesdayMorning != null ? shop.wednesdayMorning : 'Geschlossen' },&nbsp;
                        { shop.wednesdayAfternoon != null ? shop.wednesdayAfternoon : 'Geschlossen' }
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Donnerstag:</td><td>{ shop.thursdayMorning != null ? shop.thursdayMorning : 'Geschlossen' },&nbsp;
                        { shop.thursdayAfternoon != null ? shop.thursdayAfternoon : 'Geschlossen' }
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Freitag:</td><td>{ shop.fridayMorning != null ? shop.fridayMorning : 'Geschlossen' },&nbsp;
                        { shop.fridayAfternoon != null ? shop.fridayAfternoon : 'Geschlossen' }
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Samstag:</td><td>{ shop.saturdayMorning != null ? shop.saturdayMorning : 'Geschlossen' },&nbsp;
                        { shop.saturdayAfternoon != null ? shop.saturdayAfternoon : 'Geschlossen' }
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Sonntag:</td><td>{ shop.sondayMorning != null ? shop.sondayMorning : 'Geschlossen' },&nbsp;
                        { shop.sondayAfternoon != null ? shop.sondayAfternoon : 'Geschlossen' }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="has-bottom-margin">
                <h2 className="h2 has-margin">Kontakt</h2>
                { shop.owner != null ? <p className="has-margin">Inhaber: <span className="is-uppercase">{shop.owner}</span></p> : null }
                <p>{shop.street}</p>
                <p className="has-margin">{shop.cities[0].data.zip} {shop.cities[0].data.name}</p>

                <ul className="icon-list">
                  { shop.phone != null ? <li className="icon-phone"><a href={`tel:${shop.phone}`}>{shop.phone}</a></li> : null }
                  <li className="icon-mail"><a href={`mailto:${shop.email}`}>{shop.email}</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    airtable(data: { slug: { eq: $slug }}) {
      data {
        name
        description
        mondayMorning
        mondayAfternoon
        tuesdayMorning
        tuesdayAfternoon
        wednesdayMorning
        wednesdayAfternoon
        thursdayMorning
        thursdayAfternoon
        fridayMorning
        fridayAfternoon
        saturdayMorning
        saturdayAfternoon
        sundayMorning
        sundayAfternoon
        productRange {
          data {
            title
            slug
          }
        }
        conditionsAccept
        owner
        street
        cities {
          data {
            zip
            name
          }
        }
        phone
        email
        priceRange {
          data {
            value
          }
        }
        creditAccept
        specialities
        fileNode {
          thumbnails {
            full {
              url
            }
          }
        }
      }
    }
  }
`
