'use client'

import { useState } from 'react'
import {
  DataTable,
  DATA_TABLE_LAYOUTS,
  DATA_TABLE_LAYOUT_LABEL,
  DATA_TABLE_SIZES,
  DATA_TABLE_SIZE_LABEL,
  DATA_TABLE_VARIANTS,
  DATA_TABLE_VARIANT_LABEL,
  type DataColumn,
} from './DataTable'
import { Avatar } from './Avatar'
import { Badge } from './Badge'
import { Button } from './Button'
import { DocsStack, DocsStateCard, DocsStateGrid, DocsStateGroup } from './DocsCard'
import { EmptyState } from './EmptyState'
import { Caption } from './Text'

type TableProject = {
  id: string
  name: string
  status: 'Live' | 'In review' | 'Paused'
  owner: string
  seats: number
  updated: string
}

const TABLE_PROJECTS: TableProject[] = [
  { id: '1', name: 'Atlas Checkout', status: 'Live', owner: 'Alex Rivera', seats: 12, updated: 'Aug 28' },
  { id: '2', name: 'Northstar Auth', status: 'In review', owner: 'Sam Chen', seats: 8, updated: 'Aug 26' },
  { id: '3', name: 'Harbor Admin', status: 'Paused', owner: 'Jordan Lee', seats: 4, updated: 'Aug 21' },
  { id: '4', name: 'Pulse Analytics', status: 'Live', owner: 'Riley Patel', seats: 24, updated: 'Aug 19' },
]

function tableStatus(status: TableProject['status']) {
  if (status === 'Live') return 'verified' as const
  if (status === 'In review') return 'unverified' as const
  return 'muted' as const
}

function tableColumns(kind: 'full' | 'compact' | 'numeric' = 'compact'): DataColumn<TableProject>[] {
  const name: DataColumn<TableProject> = {
    key: 'name',
    header: 'Project',
    sortable: true,
    editable: true,
    editValue: (row) => row.name,
    render: (row) => (
      <span className="inline-flex min-w-0 items-center gap-2">
        <Avatar name={row.owner} size="sm" />
        <span className="truncate">{row.name}</span>
      </span>
    ),
  }
  const status: DataColumn<TableProject> = {
    key: 'status',
    header: 'Status',
    sortable: true,
    editable: false,
    render: (row) => <Badge tone={tableStatus(row.status)}>{row.status}</Badge>,
  }
  if (kind === 'compact') return [name, status]
  const owner: DataColumn<TableProject> = {
    key: 'owner',
    header: 'Owner',
    hideOnMobile: true,
    sortable: true,
    editable: true,
    render: (row) => row.owner,
  }
  const updated: DataColumn<TableProject> = {
    key: 'updated',
    header: 'Updated',
    hideOnMobile: true,
    sortable: true,
  }
  if (kind === 'numeric') {
    return [
      name,
      status,
      { key: 'seats', header: 'Seats', numeric: true, sortable: true, hideOnMobile: true },
      updated,
    ]
  }
  return [name, status, owner, updated]
}

export function TableDemo() {
  const [rows, setRows] = useState<TableProject[]>(() => [...TABLE_PROJECTS])
  const [selected, setSelected] = useState<string[]>(['1'])

  return (
    <DataTable
      caption="Projects"
      actions={
        <Button size="sm" fullWidth={false} className="w-auto">
          New
        </Button>
      }
      selectable
      editable
      selectedKeys={selected}
      onSelectionChange={setSelected}
      onEdit={({ rowKey, column, value }) => {
        setRows((current) =>
          current.map((row) => {
            if (row.id !== rowKey) return row
            if (column === 'seats') {
              const seats = Number(value)
              return { ...row, seats: Number.isFinite(seats) ? seats : row.seats }
            }
            if (column === 'name' || column === 'owner' || column === 'updated') {
              return { ...row, [column]: value }
            }
            return row
          }),
        )
      }}
      data={rows}
      rowKey={(row) => row.id}
      columns={tableColumns('full')}
      footer={<span>Double-click a cell, or Return / F2</span>}
      minWidth="560px"
    />
  )
}

function EditableTablePreview() {
  const [rows, setRows] = useState<TableProject[]>(() => TABLE_PROJECTS.slice(0, 3))

  return (
    <DataTable
      size="sm"
      editable
      data={rows}
      rowKey={(row) => row.id}
      columns={tableColumns()}
      onEdit={({ rowKey, column, value }) => {
        setRows((current) =>
          current.map((row) => (row.id === rowKey && column === 'name' ? { ...row, name: value } : row)),
        )
      }}
      minWidth="420px"
      aria-label="Editable"
    />
  )
}

export function TableStates() {
  const compact = TABLE_PROJECTS.slice(0, 3)
  const noopSelect = () => undefined

  return (
    <DocsStack gap={10}>
      <DocsStateGroup title="Appearance">
        <div className="flex flex-col gap-6">
          {DATA_TABLE_VARIANTS.map((variant) => (
            <div key={variant} className="flex flex-col gap-2">
              <Caption>{DATA_TABLE_VARIANT_LABEL[variant]}</Caption>
              <DataTable
                variant={variant}
                size="sm"
                data={compact}
                rowKey={(row) => row.id}
                columns={tableColumns()}
                minWidth="420px"
                aria-label={DATA_TABLE_VARIANT_LABEL[variant]}
              />
            </div>
          ))}
        </div>
      </DocsStateGroup>

      <DocsStateGroup title="Size">
        <div className="flex flex-col gap-6">
          {DATA_TABLE_SIZES.map((size) => (
            <div key={size} className="flex flex-col gap-2">
              <Caption>{DATA_TABLE_SIZE_LABEL[size]}</Caption>
              <DataTable
                size={size}
                data={compact}
                rowKey={(row) => row.id}
                columns={tableColumns()}
                minWidth="420px"
                aria-label={DATA_TABLE_SIZE_LABEL[size]}
              />
            </div>
          ))}
        </div>
      </DocsStateGroup>

      <DocsStateGroup title="Layout">
        <div className="flex flex-col gap-6">
          {DATA_TABLE_LAYOUTS.map((layout) => (
            <div key={layout} className="flex flex-col gap-2">
              <Caption>{DATA_TABLE_LAYOUT_LABEL[layout]}</Caption>
              <DataTable
                layout={layout}
                size="sm"
                data={compact}
                rowKey={(row) => row.id}
                columns={tableColumns()}
                minWidth="420px"
                aria-label={DATA_TABLE_LAYOUT_LABEL[layout]}
              />
            </div>
          ))}
        </div>
      </DocsStateGroup>

      <DocsStateGroup title="State">
        <DocsStateGrid columns={2}>
          <DocsStateCard label="Default" align="stretch" wide className="bg-bg-primary">
            <DataTable
              size="sm"
              data={compact.slice(0, 2)}
              rowKey={(row) => row.id}
              columns={tableColumns()}
              minWidth="320px"
            />
          </DocsStateCard>
          <DocsStateCard label="Hover" align="stretch" wide inert className="bg-bg-primary">
            <DataTable
              size="sm"
              data={compact.slice(0, 2)}
              rowKey={(row) => row.id}
              columns={tableColumns()}
              minWidth="320px"
              preview="hover"
            />
          </DocsStateCard>
          <DocsStateCard label="Selected" align="stretch" wide inert className="bg-bg-primary">
            <DataTable
              size="sm"
              selectable
              selectedKeys={['1']}
              onSelectionChange={noopSelect}
              data={compact.slice(0, 2)}
              rowKey={(row) => row.id}
              columns={tableColumns()}
              minWidth="320px"
              preview="selected"
            />
          </DocsStateCard>
          <DocsStateCard label="Focus" align="stretch" wide inert className="bg-bg-primary">
            <DataTable
              size="sm"
              selectable
              selectedKeys={[]}
              onSelectionChange={noopSelect}
              data={compact.slice(0, 2)}
              rowKey={(row) => row.id}
              columns={tableColumns()}
              minWidth="320px"
              preview="focus"
            />
          </DocsStateCard>
          <DocsStateCard label="Pressed" align="stretch" wide inert className="bg-bg-primary">
            <DataTable
              size="sm"
              data={compact.slice(0, 2)}
              rowKey={(row) => row.id}
              columns={tableColumns()}
              minWidth="320px"
              preview="active"
            />
          </DocsStateCard>
          <DocsStateCard label="Disabled row" align="stretch" wide inert className="bg-bg-primary">
            <DataTable
              size="sm"
              data={compact.slice(0, 2)}
              rowKey={(row) => row.id}
              columns={tableColumns()}
              minWidth="320px"
              isRowDisabled={(row) => row.id === '1'}
              preview="disabled"
            />
          </DocsStateCard>
          <DocsStateCard label="Empty" align="stretch" wide className="bg-bg-primary">
            <DataTable
              size="sm"
              data={[]}
              rowKey={(row) => row.id}
              columns={tableColumns()}
              minWidth="320px"
              empty={
                <EmptyState size="sm" title="No projects" body="Create a project to get started." />
              }
            />
          </DocsStateCard>
          <DocsStateCard label="Editing" align="stretch" wide inert className="bg-bg-primary">
            <DataTable
              size="sm"
              editable
              data={compact.slice(0, 2)}
              rowKey={(row) => row.id}
              columns={tableColumns()}
              minWidth="320px"
              preview="editing"
              previewColumn="name"
            />
          </DocsStateCard>
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Editing">
        <div className="flex flex-col gap-2">
          <Caption>Double-click or Return</Caption>
          <EditableTablePreview />
        </div>
      </DocsStateGroup>

      <DocsStateGroup title="Selection">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Caption>Multiple</Caption>
            <DataTable
              size="sm"
              selectable
              defaultSelectedKeys={['1', '2']}
              data={compact}
              rowKey={(row) => row.id}
              columns={tableColumns()}
              minWidth="420px"
              aria-label="Multiple"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Single</Caption>
            <DataTable
              size="sm"
              selectable="single"
              defaultSelectedKeys={['2']}
              data={compact}
              rowKey={(row) => row.id}
              columns={tableColumns()}
              minWidth="420px"
              aria-label="Single"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Mixed</Caption>
            <DataTable
              size="sm"
              selectable
              defaultSelectedKeys={['1']}
              data={compact}
              rowKey={(row) => row.id}
              columns={tableColumns()}
              minWidth="420px"
              aria-label="Mixed"
            />
          </div>
        </div>
      </DocsStateGroup>

      <DocsStateGroup title="Sort">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Caption>Ascending</Caption>
            <DataTable
              size="sm"
              sortKey="name"
              sortDirection="asc"
              data={compact}
              rowKey={(row) => row.id}
              columns={tableColumns()}
              minWidth="420px"
              aria-label="Ascending"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Descending</Caption>
            <DataTable
              size="sm"
              sortKey="status"
              sortDirection="desc"
              data={compact}
              rowKey={(row) => row.id}
              columns={tableColumns()}
              minWidth="420px"
              aria-label="Descending"
            />
          </div>
        </div>
      </DocsStateGroup>

      <DocsStateGroup title="Numeric">
        <DataTable
          size="sm"
          data={compact}
          rowKey={(row) => row.id}
          columns={tableColumns('numeric')}
          minWidth="520px"
          aria-label="Numeric"
        />
      </DocsStateGroup>

      <DocsStateGroup title="Caption and footer">
        <DataTable
          size="sm"
          caption="Workspace"
          actions={
            <Button size="sm" fullWidth={false} className="w-auto">
              Export
            </Button>
          }
          footer={<span>Showing 3 of 24</span>}
          data={compact}
          rowKey={(row) => row.id}
          columns={tableColumns()}
          minWidth="420px"
          aria-label="Caption and footer"
        />
      </DocsStateGroup>

      <DocsStateGroup title="Sticky header">
        <DataTable
          size="sm"
          stickyHeader
          maxHeight="220px"
          data={TABLE_PROJECTS}
          rowKey={(row) => row.id}
          columns={tableColumns('full')}
          minWidth="520px"
          aria-label="Sticky header"
        />
      </DocsStateGroup>
    </DocsStack>
  )
}
