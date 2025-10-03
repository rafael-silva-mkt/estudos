return {

{
  -- Autoclose parentheses, brackets, quotes, etc.
  'windwp/nvim-autopairs',
  event = 'InsertEnter',
  config = true,
  opts = {},
},
{
  -- Highlight todo, notes, etc in comments
  'folke/todo-comments.nvim',
  event = 'VimEnter',
  dependencies = { 'nvim-lua/plenary.nvim' },
  opts = { signs = false },
},
}
