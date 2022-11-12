SHELL := bash

# ターゲット等の変数の宣言
MFDIR    := $(dir $(realpath $(firstword $(MAKEFILE_LIST))))
SRCDIR   := $(MFDIR)src
JS       := $(shell cd $(SRCDIR) && ls *.js)
SOURCES  := $(addprefix $(SRCDIR)/, $(JS))
DISTDIR  := $(MFDIR)dist
DISTS    := $(addprefix $(DISTDIR)/, $(JS))
BMLDIR   := $(MFDIR)bookmarklet
BMLS     := $(addprefix $(BMLDIR)/, $(JS))

build: $(BMLS) $(DISTS)

$(DISTDIR)/%.js: $(SRCDIR)/%.js
	npm run build

$(BMLDIR)/%.js: $(DISTDIR)/%.js
	@echo -n 'javascript:(function(){' >  $@
	@cat $< >> $@
	@echo -n '})()' >> $@
	
clean:
	rm -f $(DISTS) $(BMLS)

.PHONY: build clean
