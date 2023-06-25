'use client'

import React, {useState} from 'react';
import {queryFieldsHeaders} from "@/app/cake/data/columns";

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {useToast} from "@/components/ui/use-toast"
import type {RuleGroupType} from 'react-querybuilder';
import {formatQuery, QueryBuilder} from 'react-querybuilder';
import {QueryBuilderMantine} from '@react-querybuilder/mantine';

import 'react-querybuilder/dist/query-builder.scss';
import {ScrollArea} from "@/components/ui/scroll-area";
import {prettyPrint} from "@base2/pretty-print-object";
import {ClipboardCheck} from "lucide-react";

function query() {
  console.log("query")
}

const initialQuery: RuleGroupType = {
  combinator: 'and',
  rules: [
    { field: 'speaker', operator: 'beginsWith', value: 'James' },
  ],
};

enum ExportFormat {
  json,
  sql,
  json_without_ids,
  parameterized,
  parameterized_named,
  mongodb,
  cel,
  jsonlogic,
  spel
}

// <CustomQueryBuilder fields={cakeHeadersArray} onExecute={query} />

export default function QueryPage() {
  const [query, setQuery] = useState(initialQuery);
  const { toast } = useToast()

  const copyToClipboardFn = () => {
    toast({
      description: <span className="flex flex-initial"><ClipboardCheck className="mr-2 h-4 w-4" /> Copied to clipboard</span>
    })
  }

  return (
    <div className="container py-5">

      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">
        Cake Query Builder
      </h1>
      <p className="mb-10 leading-7 [&:not(:first-child)]:mt-6">
        Use this query builder to create a Cake Next query.
      </p>

      <QueryBuilderMantine>
        <QueryBuilder
          fields={queryFieldsHeaders}
          query={query}
          onQueryChange={q => setQuery(q)}
        />
      </QueryBuilderMantine>

      <h4 className="mb-2 mt-10 scroll-m-20 text-xl font-semibold tracking-tight">
        Query
      </h4>
      <Tabs defaultValue="jsonlogic" className="w-full overflow-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="jsonlogic">JsonLogic</TabsTrigger>
          <TabsTrigger value="mongodb">MongoDB</TabsTrigger>
        </TabsList>
        <TabsContent value="jsonlogic">
          <Card>
            <CardHeader>
              <CardTitle>JsonLogic</CardTitle>
              <CardDescription>
                JsonLogic query format
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ScrollArea className="h-72 w-full space-y-1">
                <pre>
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    {
                      prettyPrint(formatQuery(query, 'jsonlogic'), {
                        // @ts-ignore
                        indent: '  ',
                        singleQuotes: false
                      })
                    }
                  </code>
                </pre>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button onClick={copyToClipboardFn}>Copy</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="mongodb">
          <Card>
            <CardHeader>
              <CardTitle>MongoDB</CardTitle>
              <CardDescription>
                MongoDB query format
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 overflow-auto">
              <ScrollArea className="h-72 w-full space-y-1">
                <pre>
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    {
                      prettyPrint(JSON.parse(formatQuery(query, 'mongodb'), {
                        // @ts-ignore
                        indent: '  ',
                        singleQuotes: false
                      }))
                    }
                  </code>
                </pre>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button>Copy</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

    </div>
  )
}
