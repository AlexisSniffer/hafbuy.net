import { Typography } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const { Text, Paragraph, Title } = Typography

const RenderContent = ({ content }: any) => {
  const renderTextNode = (node: any) => {
    let text = node.text

    if (node.bold) {
      text = <strong>{text}</strong>
    }
    if (node.italic) {
      text = <em>{text}</em>
    }
    if (node.underline) {
      text = <u>{text}</u>
    }
    if (node.strikethrough) {
      text = <s>{text}</s>
    }

    return text
  }

  const renderNode = (node: any) => {
    switch (node.type) {
      case 'text':
        return renderTextNode(node)
      case 'link':
        return (
          <Link href={node.url} target="_blank" rel="noopener noreferrer">
            {node.children.map((child: any, index: any) => (
              <React.Fragment key={index}>{renderNode(child)}</React.Fragment>
            ))}
          </Link>
        )
      default:
        return null
    }
  }

  const renderElement = (element: any) => {
    switch (element.type) {
      case 'paragraph':
        return (
          <Paragraph>
            {element.children.map((child: any, index: any) => (
              <React.Fragment key={index}>{renderNode(child)}</React.Fragment>
            ))}
          </Paragraph>
        )
      case 'heading':
        return (
          <Title level={element.level}>
            {element.children.map((child: any, index: any) => (
              <React.Fragment key={index}>{renderNode(child)}</React.Fragment>
            ))}
          </Title>
        )
      case 'list':
        const ListTag = element.format === 'ordered' ? 'ol' : 'ul'
        return (
          <ListTag style={{ marginLeft: '3rem' }}>
            {element.children.map((child: any, index: any) => (
              <li key={index}>
                {child.children.map((listChild: any, childIndex: any) => (
                  <React.Fragment key={childIndex}>
                    {renderNode(listChild)}
                  </React.Fragment>
                ))}
              </li>
            ))}
          </ListTag>
        )
      case 'quote':
        return (
          <blockquote>
            {element.children.map((child: any, index: any) => (
              <React.Fragment key={index}>{renderNode(child)}</React.Fragment>
            ))}
          </blockquote>
        )
      case 'code':
        return (
          <pre>
            <code>
              {element.children.map((child: any, index: any) => (
                <React.Fragment key={index}>{renderNode(child)}</React.Fragment>
              ))}
            </code>
          </pre>
        )
      case 'image':
        return (
          <Image
            src={element.image.url}
            alt={element.image.alternativeText || 'image'}
            width={element.image.width}
            height={element.image.height}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      {content?.map((element: any, index: any) => (
        <React.Fragment key={index}>{renderElement(element)}</React.Fragment>
      ))}
    </>
  )
}

export default RenderContent
